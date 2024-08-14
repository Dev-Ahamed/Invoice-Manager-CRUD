export const InvoiceTemplate = `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F5F5F5;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#F5F5F5"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="background-color:#f5f5f5;padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div style="padding:0px 0px 0px 0px;text-align:left">
                            <a
                              href="{{SERVER_URL}}"
                              style="text-decoration:none"
                              target="_blank"
                              ><img
                                alt="Invoice Manager"
                                src="https://unsplash.com/photos/logo-company-name-a2e7B4M8Rfk"
                                height="18"
                                style="height:18px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                            /></a>
                          </div>
                        </div>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div style="text-align:right;padding:0px 0px 0px 0px">
                            <a
                              href="{{SERVER_URL}}"
                              style="color:#242424;font-size:14px;font-weight:normal;background-color:#FFFFFF;border-radius:64px;display:inline-block;padding:12px 20px;text-decoration:none"
                              target="_blank"
                              ><span
                                ><!--[if mso
                                  ]><i
                                    style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                                    hidden
                                    >&nbsp;</i
                                  ><!
                                [endif]--></span
                              ><span>Sign in</span
                              ><span
                                ><!--[if mso
                                  ]><i
                                    style="letter-spacing: 20px;mso-font-width:-100%"
                                    hidden
                                    >&nbsp;</i
                                  ><!
                                [endif]--></span
                              ></a
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="background-color:#ffffff;padding:16px 24px 24px 24px">
                <div style="padding:16px 0px 16px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Invoice for {{name}}
                            </div>
                            <h1
                              style="font-weight:bold;text-align:left;margin:0;font-size:32px;padding:16px 0px 0px 0px"
                            >
                              $ {{amount}}
                            </h1>
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Paid {{createdAt}}
                            </div>
                            <div style="padding:16px 0px 16px 0px">
                              <hr
                                style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                              />
                            </div>
                            <div
                              style="font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Download receipt
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="padding:0px 0px 0px 0px;text-align:right"
                            >
                              <img
                                alt="Your invoice has been paid."
                                src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_8yUGBZcXaAtTEofB/invoice-skeleton.png"
                                style="outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Invoice number
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                            >
                              {{id}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Status
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                            >
                              {{status}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="height:24px"></div>
              <div style="background-color:#ffffff;padding:16px 24px 24px 24px">
                <h3
                  style="font-weight:normal;text-align:left;margin:0;font-size:20px;padding:16px 0px 16px 0px"
                >
                  Receipt #{{id}}
                </h3>
                <div
                  style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:16px 0px 16px 0px"
                >
                  {{createdAt}}
                </div>
                <div style="padding:0px 0px 0px 0px">
                  <div style="padding:8px 0px 8px 0px">
                    <hr
                      style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                    />
                  </div>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:bold;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Total
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:bold;text-align:right;padding:0px 0px 0px 0px"
                            >
                              $ {{amount}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <hr
                    style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                  />
                </div>
                <div style="padding:8px 0px 8px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:bold;text-align:left;padding:0px 0px 0px 0px"
                            >
                              Amount paid
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                        >
                          <div style="padding:0px 0px 0px 0px">
                            <div
                              style="font-size:14px;font-weight:bold;text-align:right;padding:0px 0px 0px 0px"
                            >
                              $ {{amount}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style="color:#474849;font-size:12px;font-weight:normal;text-align:left;padding:24px 24px 16px 24px"
              >
                Can we help? Just reply to this email.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
