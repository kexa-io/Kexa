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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tpTmV0d29ya1NlY3VyaXR5R3JvdXAuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xhc3MvYXp1cmUvY2tpTmV0d29ya1NlY3VyaXR5R3JvdXAuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFGQUFxRjtBQUNyRixrRkFBa0Y7OztBQUlsRix3R0FBd0c7QUFDeEcsZ0NBQWdDO0FBQ2hDLHdHQUF3RztBQUN4RyxNQUFhLDRCQUE0QjtJQU1yQztRQUpBLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBVSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2pDLGtCQUFhLEdBQVUsQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQUVULFdBQVcsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsS0FBWTtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRU0sV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sZUFBZTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsS0FBWTtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBRUo7QUEvQ0Qsb0VBK0NDIn0=