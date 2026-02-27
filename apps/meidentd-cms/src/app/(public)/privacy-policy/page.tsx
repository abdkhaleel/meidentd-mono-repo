'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-6 md:px-12 py-6 text-sm text-gray-600">
                <Link href="/" className="text-blue-700 hover:text-blue-900">Home</Link>
                <span className="mx-2">/</span>
                <span>Privacy Policy</span>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">

                <h1 className="text-4xl font-bold mb-12" style={{ color: '#113388' }}>Privacy Policy</h1>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>1. Basic Policy</h2>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Meiden T&D India limited ("we/us/our") understands that properly handling and managing information which could identify specific individuals ("Personal Data") is socially expected and an important responsibility of a company as it aims to engage in fair and good faith corporate activities, as well as being necessary in order for a company to strictly comply with the Act on the Protection of Personal Information. Therefore, in an effort to strengthen the relationship of trust between us and society as a whole, and in an effort to fulfill its social obligations, we promulgates this privacy policy ("Privacy Policy"), and will handle Personal Data in accordance with this Privacy Policy.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(1) Acquisition of Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When you visit our website, our web servers automatically record the IP address of your Internet service provider, the website from which you visit us, the pages on our website you visit and the date and duration of your visit. This information is absolutely necessary for the technical transmission of the web pages and the secure server operation. A personalized evaluation of this data does not take place.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        If you send us data via contact form, this data will be stored on our servers in the course of data backup. Your data will only be used by us to process your request. Your data will be treated strictly confidential. Your data will not be passed on to third parties.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(2) Management of Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Personal data is data about your person. This includes your name, address and email address. You also do not need to provide any personal information to visit our website. In some cases we need your name and address as well as further information to be able to offer you the desired service.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The same applies in the event that we supply you with information material on request or when we answer your enquiries. In these cases we will always point this out to you. In addition, we only store data that you have transmitted to us automatically or voluntarily.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(3) Utilization of Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When acquiring Personal Data, we will clarify the intended purpose of the utilization of the information, and use the information only to the extent necessary for achieving this purpose and performing our business.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(4) Provision of Personal Data</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        We will not disclose or provide Personal Data to any third parties except in the following cases:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2 leading-relaxed">
                        <li>When the affected person has given prior consent to the disclosure of his/her Personal Data</li>
                        <li>When disclosure of such Personal Data is necessary to protect human life, safety, or property, but where it is difficult to obtain permission from the affected person</li>
                        <li>When complying with laws and regulations</li>
                        <li>When entrusting the handling of Personal Data to a third party to the extent necessary to achieve the purpose</li>
                        <li>When sharing Personal Data with our group companies, sales agents, or other companies where necessary</li>
                        <li>When another entity succeeds to our business due to a merger, corporate separation, or transfer of business</li>
                    </ol>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(5) Response to Requests Relating to Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We will respond promptly and in accordance with relevant laws and regulations to requests relating to Personal Data, including requests for the disclosure, correction, addition, deletion, cessation of use, or purge of Personal Data.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(6) Implementation, Improvement and Revision of the Privacy Policy</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        In order to strictly comply with the Act on the Protection of Personal Information and related ordinances, guidelines set out by the government, and other relevant rules and regulations, and to implement the Privacy Policy, we will establish internal rules and regulations, etc., in addition to the Privacy Policy, and will ensure that all our employees and other persons concerned recognize the importance of such rules and regulations and comply with them.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(7) Inquiries Concerning Personal Data</h3>
                    <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6">
                        <p className="text-gray-700 mb-2"><strong>Mailing Address:</strong></p>
                        <p className="text-gray-700 mb-4">MEIDEN T&D (INDIA) LIMITED<br />Building No. 10. Tower C, 1st Floor, DLF Cyber City,<br />Phase - II, Gurgaon-122002, Haryana, India</p>
                        <p className="text-gray-700"><strong>Telephone:</strong> +91-124-4549830</p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#113388' }}>2. Personal Data Regarding Our Website Users</h2>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(1) Acquisition of Personal Data</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li>Date and time of the request</li>
                        <li>Page from which the file was requested</li>
                        <li>Access status (file transferred, file not found, etc.)</li>
                        <li>Web browser and operating system used</li>
                        <li>Complete IP address of the requesting computer</li>
                        <li>Transferred data volume</li>
                    </ul>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        These data will not be merged with other data sources. Processing takes place in accordance with legitimate interest in improving the stability and functionality of our website.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(2) Utilization of Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Personal Data offered by you will be utilized by us within the scope of the stated purpose of the utilization with which you have agreed.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(3) Utilization of Cookie</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When you visit our website, we may store information on your computer in the form of cookies. Cookies are small files that are transferred from an Internet server to your browser and stored on its hard drive. Only the Internet protocol address is stored here - no personal data.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(4) Utilization of Google Tag Manager</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        This website uses Google Tag Manager. The Tag Manager does not collect personally identifiable information. The tool triggers other tags that may themselves collect information. You can learn more at: <a href="https://www.google.com/analytics/terms/tag-manager/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">https://www.google.com/analytics/terms/tag-manager/</a>
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(5) Utilization of Google Analytics</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We use Google Analytics, a web analysis service provided by Google LLC. Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyze how users use the site. The information generated by these cookies is transmitted to Google and stored there.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        You may refuse the use of cookies by selecting the appropriate settings on your browser. Google offers a deactivation add-on for the most common browsers. For further information, please visit: <a href="https://tools.google.com/dlpage/gaoptout?hl=en-GB" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">https://tools.google.com/dlpage/gaoptout?hl=en-GB</a>
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(6) Utilization of SPIRAL</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We use the SPIRAL online database service provided by PIPED BITS Co., Ltd. as an entry form. More information available at:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        <li><a href="https://www.pi-pe.co.jp/company/management/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">Privacy Policy</a></li>
                        <li><a href="https://www.pi-pe.co.jp/company/managementsystem/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">Management System</a></li>
                        <li><a href="https://www.pi-pe.co.jp/spiral-series/spiral-suite/security/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">Data Security</a></li>
                    </ul>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(7) Safety Measures Protecting Personal Data</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We have taken technical and administrative security precautions to protect your personal data against loss, destruction, manipulation and unauthorized access. All our employees as well as service providers working for us are obliged to comply with the applicable data protection laws.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(8) Observance of Laws, Ordinances and Other Rules</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        In regard to the Personal Data provided by you through this web site, we will comply with the relevant laws and ordinances, as well as other rules that are applicable in Japan.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(9) Your Rights</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        You have the right at any time to information, correction, deletion or restriction of the processing of your stored data, a right of objection to the processing as well as a right to data transfer and a right of complaint in accordance with the requirements of data protection law.
                    </p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right to Information:</h4>
                            <p className="text-gray-700">You can request information from us as to whether and to what extent we process your data.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right to Correction:</h4>
                            <p className="text-gray-700">If we process your data that is incomplete or incorrect, you can demand that we correct or complete it at any time.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right to Deletion:</h4>
                            <p className="text-gray-700">You can demand that we delete your data if we process it unlawfully or if the processing disproportionately interferes with your legitimate protection interests.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right to Limit Processing:</h4>
                            <p className="text-gray-700">You can ask us to restrict the processing of your data in certain circumstances.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right to Data Transferability:</h4>
                            <p className="text-gray-700">You may request that we provide you with the information you have provided to us in a structured, common and machine-readable format.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right of Objection:</h4>
                            <p className="text-gray-700">If we process your data out of legitimate interest, you may object to this data processing at any time.</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2" style={{ color: '#113388' }}>Right of Complaint:</h4>
                            <p className="text-gray-700">If you are of the opinion that we infringe data protection regulations, please contact us or the supervisory authority responsible for you.</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(10) Personal Data of the Linked Pages</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Our website is linked to various other websites. However, we hereby declare that we are not responsible for the processing of personal data by such websites maintained by third parties.
                    </p>

                    <h3 className="text-lg font-bold mb-4" style={{ color: '#113388' }}>(11) Changes to this Privacy Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We reserve the right to change our privacy policy if necessary due to new technologies. Please make sure that you have the most updated version. If any essential changes are made to this privacy policy, we will notify those changes on our website.
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