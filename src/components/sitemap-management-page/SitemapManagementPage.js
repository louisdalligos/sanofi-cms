import React, { Fragment } from "react";
import { Collapse, PageHeader } from "antd";
import LegalDisclaimerComponent from "./legal-disclaimer.component";
import PrivacyPolicyComponent from "./privacy-policy.component";
import ContactUsComponent from "./contact-us.component";
import ZincCodeComponent from "./zinc-code.component";
import { connect } from "react-redux";
import {
  fetchAllMiscContent,
  cleanErrors
} from "../../redux/actions/miscellaneous-actions/miscellaneousAction";

class SitemapManagementPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllMiscContent();
  }

  handleChangePanel(key) {
    this.props.cleanErrors();
  }

  checkExists(context) {
    if (context && context.length) return true;
    return false;
  }

  render() {
    const { Panel } = Collapse;
    const {
      legalDisclaimerContent,
      privacyPolicyContent,
      contactUsContent,
      zincCodeContent,
      isLoading
    } = this.props;

    return (
      <Fragment>
        <div className="box-layout-custom">
          <PageHeader title={"Sitemap Management"} />

          <div className="content-proper">
            <Collapse
              accordion={true}
              defaultActiveKey={["1"]}
              onChange={key => {
                this.handleChangePanel(key);
              }}
            >
              <Panel header={"Legal Disclaimer"} key="1">
                <LegalDisclaimerComponent
                  isExist={this.checkExists(legalDisclaimerContent)}
                  value={legalDisclaimerContent}
                />
              </Panel>

              <Panel header={"Contact Us"} key="2">
                <ContactUsComponent
                  isExist={this.checkExists(contactUsContent)}
                  value={contactUsContent}
                />
              </Panel>

              <Panel header={"Zinc Code"} key="3">
                <ZincCodeComponent
                  isExist={this.checkExists(zincCodeContent)}
                  value={zincCodeContent}
                />
              </Panel>

              <Panel header={"Privacy Policy"} key="4">
                <PrivacyPolicyComponent
                  isExist={this.checkExists(privacyPolicyContent)}
                  value={privacyPolicyContent}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  legalDisclaimerContent: state.miscellaneousReducer.legal_disclaimer,
  privacyPolicyContent: state.miscellaneousReducer.privacy_policy,
  contactUsContent: state.miscellaneousReducer.contact_us_url,
  zincCodeContent: state.miscellaneousReducer.zinc_code,
  isLoading: state.miscellaneousReducer.isLoading
});

export default connect(
  mapStateToProps,
  { fetchAllMiscContent, cleanErrors }
)(SitemapManagementPage);

/*
'email' => 'test@email.com',
'password' => 'NW@secr3t',
*/
