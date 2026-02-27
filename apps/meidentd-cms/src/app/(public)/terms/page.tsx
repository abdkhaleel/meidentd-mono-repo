'use client';

import Link from 'next/link';

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-6 md:px-12 py-6 text-sm text-gray-600">
                <Link href="/" className="text-blue-700 hover:text-blue-900">Home</Link>
                <span className="mx-2">/</span>
                <span>Terms of Use</span>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">

                <h1 className="text-4xl font-bold mb-12" style={{ color: '#113388' }}>Terms of Use</h1>

                {/* Introduction */}
                <section className="mb-12">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        This website is managed by MEIDEN T&D (INDIA) LIMITED ("Company") or its agents for the primary purpose of offering information to our customers. When a customer utilizes this website, the Company will assume that the accessing customer has consented to the terms of use specified below ("Terms of Use"). If a person is unwilling to consent to the Terms of Use, such user is hereby requested to refrain from browsing this website or utilizing any services offered, such as any downloads offered on the website.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        The Company may from time to time change or modify a part of or all of the terms and conditions of the Terms of Use. We request that each user or customer regularly review the Terms of Use for updates. Any such modification will take effect immediately at the time the modified Terms of Use are uploaded onto this website. The Company will assume that a customer or a user has agreed to such modified Terms of Use when a customer or a user accesses or views this website upon or after such modification takes effect. When there are any separate or special conditions for utilization in regard to specific services offered on this website, such separate or special conditions shall have priority.
                    </p>
                </section>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>1. Introduction to the Utilization of Our Website</h2>
                    <p className="text-gray-700 leading-relaxed">
                        In accordance with the Terms of Use, the Company will grant to our customers the right to browse this website and to view the information available therein by way of allowing access to the same and displaying the relevant information on the data terminal of a personal computer or the like at the customer's end. However, the right granted to the customer herein shall be non-exclusive and non-transferable. The customer shall be regarded as having consented to not disrupt the management of this website in any way. If a customer violates the Terms of Use, the Company will withdraw the above-mentioned right from such customer. In such case, the customer concerned shall immediately dispose of all information acquired from this website.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>2. Copyright</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Unless otherwise specified, the Company reserves the copyright to all documents and other contents presented in this website. Each user shall be aware that any action such as duplication, modification, reprint, etc. of the contents included in the website without permission from the Company is prohibited pursuant to the Copyright Act. The Company will not grant a license to any customer of any of the Company's rights in regard to copyright, patents, trademarks, and other intellectual properties belonging to the Company.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        When there are separate or special conditions for utilization stipulated in a particular document, such separate or special conditions shall have priority.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>3. Provision of Information</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The provision of confidential information by a customer or its agents through this website is prohibited. Any information provided by a customer to the Company through this website will be accepted under the assumption that the customer concerned has consented to the Company handling such information as non-confidential information.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Any information provided by a customer or its agents to the Company through this website will be accepted under the assumption that the right to utilize such information has been given to the Company on a free of charge basis, which will be irrevocable and without any limitations. However, the personal information of each customer will be handled in accordance with the "Privacy Policy", to be promulgated separately.
                    </p>
                    <p className="text-gray-700 font-bold mb-4">
                        Any actions, including writing, that produces material which falls into any of the categories specified below shall be prohibited:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-2 mb-6">
                        <li>Contents that could infringe the copyright or any other intellectual property belonging to the Company or a third party</li>
                        <li>Contents that could defame, calumniate, or threaten the Company or a third party</li>
                        <li>Contents that could be deemed to be the promotion of a business, advertisement, invitation, solicitation, etc.</li>
                        <li>Contents contrary to public order and morals</li>
                        <li>Contents that causes or could cause criminal acts or crimes</li>
                        <li>Any other contents that could hinder the management of the website, as determined by the Company</li>
                    </ol>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>4. Disclaimer</h2>
                    <p className="text-gray-700 leading-relaxed">
                        The Company pays utmost attention to the quality of the information displayed on this website, but the Company takes no responsibility in any way for the correctness, reliability, timeliness, usefulness, and fitness for a customer's purpose of such information, nor does the Company take responsibility for the safety and the functionality of this website itself. Unless otherwise specified in the specific terms and conditions for a particular service offered on this website, the Company takes no responsibility in any way for any damages accrued by the customer in relation to the customer's utilization of this website.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>5. Linkage</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The Company shall in no way be responsible for any damages accrued by the customer in relation to the customer's utilization of a website linked to the Company's website ("Link Site"), or the contents acquired through the Link Site. When a customer utilizes a Link Site, the customer shall be required to comply with the terms of use stipulated by such Link Site.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        The presence of a link to a Link Site on this website does not imply the Company's utilization of such Link Site, nor does it imply any business relationship between the Company and the person or organization that manages the Link Site, or the merchandise or services, etc. displayed on the Link Site.
                    </p>
                </section>

                {/* Section 6 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>6. Linkage With This Website</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When linking to this website via a website other than the Company's website, no particular statement to report that fact to the Company is required. However, the user will be deemed to understand and agree that the Company may demand the cancelation of the link to the Company's website when the Company determines such linkage to be undesirable.
                    </p>
                    <p className="text-gray-700 font-bold mb-4">
                        Any linkage from a website which falls into or could fall into any of the following categories will be rejected:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-2 mb-6">
                        <li>Linkage from a website that defames or calumniates the Company, its associated companies, or a third party</li>
                        <li>Linkage from a website that impairs the Company's credibility, reputation, or dignity, such as websites contrary to public order and morality</li>
                        <li>Linkage from a website that contains illegal or possibly illegal contents, or is concerned with illegal or possibly illegal activities</li>
                        <li>Linkage that may give rise to a misconception of any possible affiliated or cooperative relationship with the Company, or a misconception that the Company is acknowledging or supporting the website containing the original linkage</li>
                    </ol>
                    <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6">
                        <p className="text-gray-700">
                            The Company shall not be responsible in any way for any complaints, claims, or other similar petitions from a customer or a third party related to a customer website that falls into any of the above categories. Each user will hold harmless and cause no damage to the Company. The Company has promulgated a separate "Privacy Policy" which each customer is requested to read.
                        </p>
                    </div>
                </section>

                {/* Section 7 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>7. Utilization Outside India and Applicable Laws</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        This website is managed and controlled within the territory of India by the Company. The Company makes no declaration or representation in regard to whether activities such as acquiring information on this website or making access available to this website are permissible, legally valid, or possible in any other country or area outside of India. The establishment, effectiveness, enforceability, fulfilment, and interpretation of the Terms of Use will be governed by the laws of India. Should any necessity for any litigation arise in regard to this website between a customer and the Company, India Court shall have exclusive jurisdiction as the court of first instance.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>Trademarks of Other Companies</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2 mb-6">
                        <li>Adobe and an Adobe logo are either registered trademarks or trademarks of Adobe Systems Incorporated in the United States and/or other countries.</li>
                        <li>Microsoft, Windows, Windows Vista, Aero, Excel, Outlook, PowerPoint, Windows Media, a Windows logo, a Windows start logo, and an Office logo are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        In addition, the corporate names or product names, etc. are either trade names, or trademarks or registered trademarks of the respective owners.
                    </p>
                    <p className="text-gray-700">
                        Further, in case trademarks are individually shown in the web page of this site, the terms and conditions of the trademarks of the other companies shown here shall prevail.
                    </p>
                </section>

            </div>

            {/* Scroll to Top Button */}
            <div className="fixed bottom-8 right-8">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2 bg-gray-300 hover:bg-blue-700 text-gray-900 hover:text-white rounded transition-colors text-sm font-medium"
                >
                    ⇧ Top
                </button>
            </div>
        </div>
    );
}