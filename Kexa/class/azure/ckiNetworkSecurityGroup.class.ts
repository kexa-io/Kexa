import { CkiNetworkSecurityGroup } from "../../models/azure/ckiNetwordSecurityGroup.models";

// class azure CLOUD RESOURCES

export class CkiNetworkSecurityGroupClass implements CkiNetworkSecurityGroup {

    analysed: boolean = false;
    scanningDate : Date = new Date();
    securityLevel:number = 0;

    constructor() {}

    public setAnalysed(value:boolean) {
        this.analysed = value;
    }

    public setScanningDate(value:Date) {
        this.scanningDate = value;
    }

    public setSecurityLevel(value:number) {
        this.securityLevel = value;
    }

    public getAnalysed() {
        return this.analysed;
    }

    public getScanningDate() {
        return this.scanningDate;
    }

    public getSecurityLevel() {
        return this.securityLevel;
    }

    public addAnalysed(value:boolean) {
        this.analysed = value;
        return this;
    }

    public addScanningDate(value:Date) {
        this.scanningDate = value;
        return this;
    }

    public addSecurityLevel(value:number) {
        this.securityLevel = value;
        return this;
    }

}