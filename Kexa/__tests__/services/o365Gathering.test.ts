import { formatTokenErrorForLog } from "../../services/addOn/o365Gathering.service";

const { expect } = require('chai');

const SECRET = "sup3r-cl13nt-s3cr3t";

describe('o365Gathering formatTokenErrorForLog', () => {
    it('should not include the request body (and therefore client_secret) from a failed axios request', () => {
        // Shape of a real axios error on a failed token POST: the request
        // body (client_secret included) is echoed back on error.config.data.
        const axiosLikeError = {
            message: "Request failed with status code 401",
            config: {
                url: "https://login.microsoftonline.com/tenant/oauth2/v2.0/token",
                data: `grant_type=client_credentials&client_id=app-1&client_secret=${SECRET}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default`,
            },
            response: { status: 401, data: { error: "invalid_client" } },
        };
        const formatted = formatTokenErrorForLog(axiosLikeError);
        expect(formatted).to.not.include(SECRET);
        expect(formatted).to.include("401");
        expect(formatted).to.include("Request failed with status code 401");
    });

    it('should handle a plain Error with no response', () => {
        const formatted = formatTokenErrorForLog(new Error("network timeout"));
        expect(formatted).to.include("network timeout");
        expect(formatted).to.not.include(SECRET);
    });
});
