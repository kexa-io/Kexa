import { ResultScan, SubResultScan } from "../../models/resultScan.models"
import { GlobalConfigAlert } from "../../models/settingFile/globalAlert.models"
import { Rules } from "../../models/settingFile/rules.model"
const levelAlert = ["info", "warning", "error", "critical"];

export const Emails = {
    OneAlert : (receiver:string, resource: any, rule: Rules, conditions: SubResultScan[], color: string= "#4f5660") => {return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=3Dedge">
      <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=3DUTF-8">
    <style type="text/css">
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass * { line-height:100%; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix {
        width:100% !important;
      }
    </style>
    <![endif]-->
    
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
    
            @import url(https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700);
    
        </style>
      <!--<![endif]--><style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
      }
    </style>
    </head>
    <body style="background: #F9F9F9;">
      <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]-->
      <style type="text/css">
        html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        a {
          color:#1EB0F4;
          text-decoration:none;
        }
        a:hover {
          text-decoration:underline;
        }
      </style>
    <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"><a href="https://click.discord.com/ls/click?upn=3DqDOo8cnwIoKzt0aLL1cBeARJoBrGSa2vu41A5vK-2B4ute1kWYI6zNuxQFCVciWW4KHGYg_QW0xIquR3VakdFxkxznmRW4cx8VEMk2PnXtv2QuOQ7vygTNIMpIQ8jyBV38bQyboGXXkKtQAwE9lVWzoU4pvWzpsPct0k7K0OcaiEPnnDIbQK7O-2Bk05p09cSoYgsH-2FEcSy-2FBBnny5AN20KZoAjYPr2bjmG136A-2BFAA22p5G0iVZrpUYCh5Fcg-2FoFHra4p-2Bouz-2BGLAgmTV2Yb0oiG0o-2Bi9HzB-2F1YBWibv-2BMyWjmV4TiAKBncye-2FaSXLJw8VRNxdGp" target="_blank"></a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
      <h2 style="font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
    
        Hi 
        `+ receiver +`
    
    
    </h2>
    <p>
    
    
      CheckInfra have detected an alert on your server, please check the code below to know more about the alert.
    
    
    </p>
    
              </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;" align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2f3f4;background-color:#f2f3f4;width:100%">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center" colspan="4">
                      <div style="font-family:Poppins,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:24px;font-weight:bold;line-height:36px;text-align:center;color:`+ color +`"> `+ resource.id +` </div>
                    </td>
                  </tr>
                </tbody>
                </table>
        
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
              <tr>
              <td style="direction:ltr;;padding:20px 0;text-align:center"  colspan="1">
                Name :`+ rule.name +`
              </td>
              <td style="direction:ltr;;padding:20px 0;text-align:center"  colspan="3">
                Description :`+ rule.description +`
              </td>
            </tr>
            `+
              conditions.map((condition) => {
                return `
                  <tr>
                    <td style="direction:ltr;;padding:20px 0;text-align:center"  colspan="`+ ((condition.message)?'2':'4') +`">
                      Condition :`+ JSON.stringify(condition.condition) +`
                    </td>
                    `+ ((condition.message)?
                      '<td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center"  colspan="2">'+
                        'Message(optional) :' + condition.message +
                      '</td>'
                      :'') +
                    `
                  </tr>
                `}).join('')
            +`
            <tr>
              <td style="direction:ltr;;padding:20px 0;text-align:center" colspan="4">
                Details resources: <p>`+ JSON.stringify(resource) +`</p>
              </td>
            </tr>
          </tbody>
        </table>
        </td>
      </tr>
      <tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#747F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:16px;text-align:left;">
    <p style="direction:ltr;;padding:20px 0;text-align:center">Thank you, for using check infra</p>
    
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]=
    >
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
          4urcloud - 2023
        </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#000000;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:22px;text-align:left;">
        </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></div>
    </html>`
  },
  GlobalAlert : (receiver:string, compteError: number[], allScan: ResultScan[][], alert: GlobalConfigAlert) => {return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=3Dedge">
      <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=3DUTF-8">
    <style type="text/css">
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass * { line-height:100%; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix {
        width:100% !important;
      }
    </style>
    <![endif]-->
    
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
    
            @import url(https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700);
    
        </style>
      <!--<![endif]--><style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
      }
    </style>
    </head>
    <body style="background: #F9F9F9;">
      <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]-->
      <style type="text/css">
        html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        a {
          color:#1EB0F4;
          text-decoration:none;
        }
        a:hover {
          text-decoration:underline;
        }
      </style>
    <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"><a href="https://click.discord.com/ls/click?upn=3DqDOo8cnwIoKzt0aLL1cBeARJoBrGSa2vu41A5vK-2B4ute1kWYI6zNuxQFCVciWW4KHGYg_QW0xIquR3VakdFxkxznmRW4cx8VEMk2PnXtv2QuOQ7vygTNIMpIQ8jyBV38bQyboGXXkKtQAwE9lVWzoU4pvWzpsPct0k7K0OcaiEPnnDIbQK7O-2Bk05p09cSoYgsH-2FEcSy-2FBBnny5AN20KZoAjYPr2bjmG136A-2BFAA22p5G0iVZrpUYCh5Fcg-2FoFHra4p-2Bouz-2BGLAgmTV2Yb0oiG0o-2Bi9HzB-2F1YBWibv-2BMyWjmV4TiAKBncye-2FaSXLJw8VRNxdGp" target="_blank"></a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
      <h2 style="font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
    
        Hi 
        `+ receiver +`
    
    
    </h2>
    <p>
    
    
      CheckInfra have done a scan on your server, please check the code below to know more about the render.
    
    
    </p>
    
              </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;" align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2f3f4;background-color:#f2f3f4;width:100%">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center" colspan="4">
                      <div style="font-family:Poppins,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:24px;font-weight:bold;line-height:36px;text-align:center;color:#4f5660"> `+ (alert.name??'Uname global alert') +` </div>
                    </td>
                  </tr>
                </tbody>
                </table>
        
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
            `+
              compteError.map((compte, index) => {
                return `
                  <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="1">
                      `+ levelAlert[index] +` :
                    </td>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="3">
                      ` + compte + `
                    </td>
                  </tr>
                `}).join('')
            +`
          </tbody>
        </table>
        </td>
      </tr>
      <tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#747F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:16px;text-align:left;">
    <p style="direction:ltr;;padding:20px 0;text-align:center">Thank you, for using check infra</p>
    
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]=
    >
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
          4urcloud - 2023
        </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#000000;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:22px;text-align:left;">
        </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></div>
    </html>`
  },
}