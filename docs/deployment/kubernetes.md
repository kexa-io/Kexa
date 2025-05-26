# Kubernetes Deployment

This guide explains how to deploy and run Kexa on a Kubernetes cluster.

## Prerequisites

- Kubernetes cluster (v1.19 or higher)
- kubectl configured
- Access to cloud provider accounts (AWS, Azure, GCP)

## Deployment Methods

### 1. Using kubectl

Create a `kexa-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kexa
  namespace: kexa
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kexa
  template:
    metadata:
      labels:
        app: kexa
    spec:
      containers:
      - name: kexa
        image: innovtech/kexa:latest
        volumeMounts:
        - name: rules
          mountPath: /app/rules
        - name: output
          mountPath: /app/output
        - name: env
          mountPath: /app/.env
          subPath: .env
        env:
        - name: NODE_ENV
          value: "production"
      volumes:
      - name: rules
        persistentVolumeClaim:
          claimName: kexa-rules-pvc
      - name: output
        persistentVolumeClaim:
          claimName: kexa-output-pvc
      - name: env
        secret:
          secretName: kexa-env
```

Create the necessary resources:

```bash
# Create namespace
kubectl create namespace kexa

# Create PVCs
kubectl apply -f kexa-pvc.yaml

# Create secrets
kubectl create secret generic kexa-env --from-file=.env -n kexa

# Deploy Kexa
kubectl apply -f kexa-deployment.yaml
```


## Configuration

### Persistent Volumes

Create PVCs for rules and output:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: kexa-rules-pvc
  namespace: kexa
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: kexa-output-pvc
  namespace: kexa
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

### Environment Variables

Create a secret for environment variables:

```bash
kubectl create secret generic kexa-env \
  --from-file=.env \
  -n kexa
```

## Scheduled Scans

### Using CronJob

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: kexa-scan
  namespace: kexa
spec:
  schedule: "0 0 * * *"  # Daily at midnight
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: kexa
            image: innovtech/kexa:latest
            volumeMounts:
            - name: rules
              mountPath: /app/rules
            - name: output
              mountPath: /app/output
            - name: env
              mountPath: /app/.env
              subPath: .env
          volumes:
          - name: rules
            persistentVolumeClaim:
              claimName: kexa-rules-pvc
          - name: output
            persistentVolumeClaim:
              claimName: kexa-output-pvc
          - name: env
            secret:
              secretName: kexa-env
          restartPolicy: OnFailure
```

## Monitoring

### Logs

```bash
# View pod logs
kubectl logs -f deployment/kexa -n kexa

# View CronJob logs
kubectl logs -f job/kexa-scan-<timestamp> -n kexa
```

### Status

```bash
# Check deployment status
kubectl get deployment kexa -n kexa

# Check pod status
kubectl get pods -n kexa

# Check CronJob status
kubectl get cronjob kexa-scan -n kexa
```

## Maintenance

### Updates

```bash
# Update deployment
kubectl set image deployment/kexa kexa=innovtech/kexa:latest -n kexa

# Update Helm release
helm upgrade kexa kexa/kexa -f values.yaml -n kexa
```

### Backup

```bash
# Backup PVC data
kubectl cp kexa/<pod-name>:/app/rules ./rules-backup
kubectl cp kexa/<pod-name>:/app/output ./output-backup
```

## Security Considerations

1. **Pod Security**
   - Use security contexts
   - Implement network policies
   - Use service accounts

2. **Secret Management**
   - Use Kubernetes secrets
   - Implement proper RBAC
   - Rotate credentials regularly

3. **Resource Management**
   - Set resource limits
   - Implement pod disruption budgets
   - Use horizontal pod autoscaling

## Troubleshooting

### Common Issues

1. **Pod Won't Start**
   - Check pod events
   - Verify PVCs
   - Check secrets

2. **CronJob Failures**
   - Check job logs
   - Verify schedule
   - Check resource limits

3. **Storage Issues**
   - Verify PVC status
   - Check storage class
   - Verify permissions

## Next Steps

- [Azure Functions Deployment](./azure-function.md)
- [Docker Deployment](./docker.md)
- [Local Deployment](./local.md)
