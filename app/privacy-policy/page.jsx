/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import moment from 'moment'
import Script from 'next/script'
// function
import { getGeneralInfo } from '@/function/page'
import { generateStaticRoutes, checkRoute } from '@/function/navigation'
// components
import { DefaultHero } from '@/components/sections'

export async function generateMetadata({ params }) {
  const general = await getGeneralInfo()
  const path = await checkRoute(`/`)
  const { fields } = path

  const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')

  return {
    title: `Privacy Policy - ${metaTitle}`,
    description: metaTitle,
    openGraph: {
      title: `Privacy Policy - ${metaTitle}`,
      description: metaTitle,
      images: [`https://fluxconsole.com/files/item/1332/170630/OG%20Image%20(1)%20(1).png`],
      url: `${_.get(general, 'url')}privacy-policy`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}privacy-policy`,
    },
  };
}

export default async function Home({ params }) {
  const { url, organizationLegal } = await getGeneralInfo()

  return (
    <>
      <DefaultHero
        data={{
          name: 'Privacy Policy'
        }}
      />
      
      <div className="w-ful overflow-hidden relative">
        <div className="my-20">
        <div className="mx-auto xl:text-lg">
            {/* title and subtitle */}
            <div className="mt-8 space-y-6 md:mt-10 xl:space-y-8">
              <div className="prose max-w-screen-lg bg-transparent mx-auto">
                <p>
                  This Statement of Privacy applies to {url} and {organizationLegal} and governs data collection and usage. For the purposes of this Privacy Policy, unless
                  otherwise noted, all references to {organizationLegal} include
                  {url} and {organizationLegal}. The {organizationLegal} website is a publicly accessible website. By using the {organizationLegal} website, you
                  consent to the data practices described in this statement.&nbsp;
                </p>

                <h3>Collection of your Personal Information</h3>
                In order to better provide you with products and services offered on our Site, {organizationLegal} may collect personally identifiable information, such as your:&nbsp;

                <ul>
                  <li>&nbsp;First and Last Name</li>
                  <li>&nbsp;E-mail Address</li>
                  <li>&nbsp;Phone Number&nbsp;</li>
                </ul>

                <p>
                  We do not collect any personal information about you unless you voluntarily provide it to
                  us. However, you may be required to provide certain personal information to us when you
                  elect to use certain products or services available on the Site. These may include: (a)
                  registering for an account on our Site; (b) entering a sweepstakes or contest sponsored by
                  us or one of our partners; (c) signing up for special offers from selected third parties;
                  (d) sending us an email message; (e) submitting your credit card or other payment
                  information when ordering and purchasing products and services on our Site. To wit, we will
                  use your information for, but not limited to, communicating with you in relation to services
                  and/or products you have requested from us. We also may gather additional personal or
                  non-personal information in the future.
                </p>

                <h3>Use of your Personal Information</h3>

                <p>{organizationLegal} collects and uses your personal information to operate its website(s)
                  and deliver the services you have requested.
                </p>

                <p>{organizationLegal} may also use your personally identifiable information to inform you of
                              other products or services available from {organizationLegal} and its affiliates.</p>

                <h3>Sharing Information with Third Parties</h3>

                <p>{organizationLegal} does not sell, rent or lease its customer lists to third parties.</p>

                <p>{organizationLegal} may share data with trusted partners to help perform statistical
                    analysis, send you email or postal mail, provide customer support, or arrange for
                    deliveries. All such third parties are prohibited from using your personal information
                    except to provide these services to {organizationLegal}, and they are required to maintain
                    the confidentiality of your information.</p>

                <p>{organizationLegal} may disclose your personal information, without notice, if required to
                    do so by law or in the good faith belief that such action is necessary to: (a) conform to
                    the edicts of the law or comply with legal process served on {organizationLegal} or the
                    site; (b) protect and defend the rights or property of {organizationLegal}; and/or (c) act
                    under exigent circumstances to protect the personal safety of users of {organizationLegal},
                    or the public.</p>

                <h3>Automatically Collected Information</h3>

                <p>Information about your computer hardware and software may be automatically collected by
                    {organizationLegal}. This information can include: your IP address, browser type, domain
                    names, access times and referring website addresses. This information is used for the
                    operation of the service, to maintain quality of the service, and to provide general
                    statistics regarding use of the {organizationLegal} website.&nbsp;</p>

                <h3>Links</h3>

                <p>This website contains links to other sites. Please be aware that we are not responsible for
                    the content or privacy practices of such other sites. We encourage our users to be aware
                    when they leave our site and to read the privacy statements of any other site that collects
                    personally identifiable information.</p>

                <h3>Security of your Personal Information</h3>

                <p>{organizationLegal} secures your personal information from unauthorized access, use, or
                    disclosure. {organizationLegal} uses the following methods for this purpose:&nbsp;</p>

                <ul>
                    <li>&nbsp;SSL Protocol</li>
                </ul>

                <p>&nbsp;<br />
                    When personal information (such as a credit card number) is transmitted to other websites,
                    it is protected through the use of encryption, such as the Secure Sockets Layer (SSL)
                    protocol.<br />
                    &nbsp;<br />
                    We strive to take appropriate security measures to protect against unauthorized access to or
                    alteration of your personal information. Unfortunately, no data transmission over the
                    Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we
                    strive to protect your personal information, you acknowledge that: (a) there are security
                    and privacy limitations inherent to the Internet which are beyond our control; and (b)
                    security, integrity, and privacy of any and all information and data exchanged between you
                    and us through this Site cannot be guaranteed.<br />
                    &nbsp;</p>

                <h3>Right to Deletion</h3>

                <p>Subject to certain exceptions set out below, on receipt of a verifiable request from you, we
                    will:</p>

                <ul>
                    <li>Delete your personal information from our records; and</li>
                    <li>Direct any service providers to delete your personal information from their records.
                    </li>
                </ul>

                <p>&nbsp;<br />
                    <em>Please note that we may not be able to comply with requests to delete your personal
                        information if it is necessary to:</em>
                </p>

                <ul>
                    <li>Complete the transaction for which the personal information was collected, fulfill the
                        terms of a written warranty or product recall conducted in accordance with federal law,
                        provide a good or service requested by you, or reasonably anticipated within the context
                        of our ongoing business relationship with you, or otherwise perform a contract between
                        you and us;</li>
                    <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal
                        activity; or prosecute those responsible for that activity;</li>
                    <li>Debug to identify and repair errors that impair existing intended functionality;</li>
                    <li>Exercise free speech, ensure the right of another consumer to exercise his or her right
                        of free speech, or exercise another right provided for by law;</li>
                    <li>Comply with the California Electronic Communications Privacy Act;</li>
                    <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the
                        public interest that adheres to all other applicable ethics and privacy laws, when our
                        deletion of the information is likely to render impossible or seriously impair the
                        achievement of such research, provided we have obtained your informed consent;</li>
                    <li>Enable solely internal uses that are reasonably aligned with your expectations based on
                        your relationship with us;</li>
                    <li>Comply with an existing legal obligation; or</li>
                    <li>Otherwise use your personal information, internally, in a lawful manner that is
                        compatible with the context in which you provided the information.&nbsp;</li>
                </ul>

                <h3>Children Under Thirteen</h3>

                <p>{organizationLegal} does not knowingly collect personally identifiable information from
                    children under the age of thirteen. If you are under the age of thirteen, you must ask your
                    parent or guardian for permission to use this website.</p>

                <h3>E-mail Communications</h3>

                <p>From time to time, {organizationLegal} may contact you via email for the purpose of
                    providing announcements, promotional offers, alerts, confirmations, surveys, and/or other
                    general communication. In order to improve our Services, we may receive a notification when
                    you open an email from {organizationLegal} or click on a link therein.</p>

                <p>If you would like to stop receiving marketing or promotional communications via email from
                    {organizationLegal}, you may opt-out of such communications by clicking on the Unsubscribe
                    button in promotional emails..&nbsp;</p>

                <h3>External Data Storage Sites</h3>

                <p>We may store your data on servers provided by third party hosting vendors with whom we have
                    contracted.&nbsp;</p>

                <h3>Changes to this Statement</h3>

                <p>{organizationLegal} reserves the right to change this Privacy Policy from time to time. We
                    will notify you about significant changes in the way we treat personal information by
                    sending a notice to the primary email address specified in your account, by placing a
                    prominent notice on our site, and/or by updating any privacy information on this page. Your
                    continued use of the Site and/or Services available through this Site after such
                    modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and
                    (b) agreement to abide and be bound by that Policy.&nbsp;</p>

                <h3>Contact Information</h3>

                <p>{organizationLegal} welcomes your questions or comments regarding this Statement of Privacy.
                    If you believe that {organizationLegal} has not adhered to this Statement, please contact
                    {organizationLegal} but visiting our <a href={`${url}/contact`}>contact page</a>.<br />
                    &nbsp;<br />
                    <strong>{organizationLegal}</strong>
                </p>

                <p><em>Effective as of {moment().format('ll')}</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return await generateStaticRoutes()
}
