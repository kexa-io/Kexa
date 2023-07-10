"use strict";
//import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
//import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CkiNetworkSecurityGroupClass = void 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// class azure CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
class CkiNetworkSecurityGroupClass {
    constructor() {
        this.analysed = false;
        this.scanningDate = new Date();
        this.securityLevel = 0;
    }
    setAnalysed(value) {
        this.analysed = value;
    }
    setScanningDate(value) {
        this.scanningDate = value;
    }
    setSecurityLevel(value) {
        this.securityLevel = value;
    }
    getAnalysed() {
        return this.analysed;
    }
    getScanningDate() {
        return this.scanningDate;
    }
    getSecurityLevel() {
        return this.securityLevel;
    }
    addAnalysed(value) {
        this.analysed = value;
        return this;
    }
    addScanningDate(value) {
        this.scanningDate = value;
        return this;
    }
    addSecurityLevel(value) {
        this.securityLevel = value;
        return this;
    }
}
exports.CkiNetworkSecurityGroupClass = CkiNetworkSecurityGroupClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tpTmV0d29ya1NlY3VyaXR5R3JvdXAuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9LZXhhL2NsYXNzL2F6dXJlL2NraU5ldHdvcmtTZWN1cml0eUdyb3VwLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxRkFBcUY7QUFDckYsa0ZBQWtGOzs7QUFJbEYsd0dBQXdHO0FBQ3hHLGdDQUFnQztBQUNoQyx3R0FBd0c7QUFDeEcsTUFBYSw0QkFBNEI7SUFNckM7UUFKQSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqQyxrQkFBYSxHQUFVLENBQUMsQ0FBQztJQUVWLENBQUM7SUFFVCxXQUFXLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRU0sZUFBZSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQVk7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLGVBQWU7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFTSxnQkFBZ0I7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxXQUFXLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sZUFBZSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQVk7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUVKO0FBL0NELG9FQStDQyJ9