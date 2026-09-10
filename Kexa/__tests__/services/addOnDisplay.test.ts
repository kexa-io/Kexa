import { propertyToSend as awsPropertyToSend } from "../../services/addOn/display/awsDisplay.service";
import { propertyToSend as azurePropertyToSend } from "../../services/addOn/display/azureDisplay.service";
import { propertyToSend as githubPropertyToSend } from "../../services/addOn/display/githubDisplay.service";
import { propertyToSend as gwsPropertyToSend } from "../../services/addOn/display/googleWorkspaceDisplay.service";

const { expect } = require('chai');

const XSS_PAYLOAD = `"><script>alert(1)</script>`;

describe('addOn display XSS hardening', () => {
    describe('awsDisplay', () => {
        it('should escape a malicious tag value', () => {
            const result = awsPropertyToSend(
                { objectName: "KexaAwsCustoms.tagsValueListing" } as any,
                { Value: XSS_PAYLOAD, Region: "eu-west-1" },
                false
            );
            expect(result).to.not.include('<script>');
        });

        it('should escape a malicious GroupId in the ec2SG link', () => {
            const result = awsPropertyToSend(
                { objectName: "ec2SG" } as any,
                { Region: "eu-west-1", GroupId: XSS_PAYLOAD },
                false
            );
            expect(result).to.not.include('<script>');
        });
    });

    describe('azureDisplay', () => {
        it('should escape a malicious displayName', () => {
            const result = azurePropertyToSend(
                { objectName: "KexaAzure.applications" } as any,
                { displayName: XSS_PAYLOAD, appId: "app-1" },
                false
            );
            expect(result).to.not.include('<script>');
        });
    });

    describe('githubDisplay', () => {
        it('should escape a malicious repository name', () => {
            const result = githubPropertyToSend(
                { objectName: "repositories" } as any,
                { full_name: "org/repo", name: XSS_PAYLOAD },
                false
            );
            expect(result).to.not.include('<script>');
        });

        it('should escape a malicious malicious-dependency name (supply-chain finding)', () => {
            const result = githubPropertyToSend(
                { objectName: "packages" } as any,
                { repo: "org/repo", name: "left-pad", version: "1.0.0" },
                false,
                [{
                    value: [{ name: XSS_PAYLOAD, version: "9.9.9" }],
                    result: false,
                    condition: [{
                        property: "dependencies",
                        condition: "NAND" as any,
                        value: [{
                            operator: "NAND",
                            criteria: [
                                { property: "name", condition: "EQUAL", value: XSS_PAYLOAD },
                                { property: "version", condition: "IN", value: ["9.9.9"] },
                            ],
                        }],
                    }],
                }] as any
            );
            expect(result).to.not.include('<script>');
        });

        it('should not follow a javascript: URL as an href', () => {
            const result = githubPropertyToSend(
                { objectName: "issues" } as any,
                { html_url: "javascript:alert(1)", id: "1" },
                false
            );
            expect(result).to.not.include('href="javascript:');
        });
    });

    describe('googleWorkspaceDisplay', () => {
        it('should not follow a javascript: URL as an href for a file link', () => {
            const result = gwsPropertyToSend(
                { objectName: "file" } as any,
                { webViewLink: "javascript:alert(1)", name: "doc", id: "1" },
                false
            );
            expect(result).to.not.include('href="javascript:');
        });
    });
});
