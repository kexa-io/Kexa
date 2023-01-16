"use strict";
const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
// For client-side applications running in the browser, use InteractiveBrowserCredential instead of DefaultAzureCredential. See https://aka.ms/azsdk/js/identity/examples for more details.
const subscriptionId = "6801827d-ab32-4cb3-94c4-ee8b41d1603c";
const client = new ComputeManagementClient(new DefaultAzureCredential(), subscriptionId);
// For client-side applications running in the browser, use this code instead:
// const credential = new InteractiveBrowserCredential({
//   tenantId: "<YOUR_TENANT_ID>",
//   clientId: "<YOUR_CLIENT_ID>"
// });
// const client = new ComputeManagementClient(credential, subscriptionId);
