import { annotateMfaStatus } from "../../services/addOn/githubGathering.service";

const { expect } = require('chai');

describe('githubGathering annotateMfaStatus (MFA pagination fix)', () => {
    it('should correctly flag a 2FA-disabled member even when they are on a later "page" than the filtered list has', () => {
        // Reproduces the real bug scenario: an org has 150 members (2 pages
        // of 100), but only 1 member has 2FA disabled, and that member is on
        // page 2 of the full list. The (now fixed) code fully paginates the
        // 2fa_disabled filter first -- regardless of how many pages that
        // takes -- into a single complete set, then cross-references it
        // against each page of the full member list independently.
        const loginsWithoutMFA = new Set<string>(["userOnPage2WithNo2FA"]);

        const page1 = [{ login: "userA" }, { login: "userB" }];
        const page2 = [{ login: "userOnPage2WithNo2FA" }, { login: "userC" }];

        annotateMfaStatus(page1, loginsWithoutMFA);
        annotateMfaStatus(page2, loginsWithoutMFA);

        expect(page1.find((m: any) => m.login === "userA")!.mfa).to.equal(true);
        expect(page1.find((m: any) => m.login === "userB")!.mfa).to.equal(true);
        expect(page2.find((m: any) => m.login === "userOnPage2WithNo2FA")!.mfa).to.equal(false);
        expect(page2.find((m: any) => m.login === "userC")!.mfa).to.equal(true);
    });

    it('should mark everyone as mfa:true when no one has 2FA disabled', () => {
        const members = [{ login: "a" }, { login: "b" }];
        annotateMfaStatus(members, new Set<string>());
        expect(members.every((m: any) => m.mfa === true)).to.equal(true);
    });
});
