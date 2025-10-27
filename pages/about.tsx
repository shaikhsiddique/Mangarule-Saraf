import Head from "next/head";

export default function About() {
  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>About Us - Mangarule Saraf</title>
        <meta name="description" content="Learn about the prestigious legacy of Ramchandra Vishnu Mangarule Saraf, founded in 1957" />
      </Head>

      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-ms-purple mb-6">
            🌟 RAMCHANDRA VISHNU MANGARULE SARAF 💫
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-ms-purple to-ms-violet mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-ms-dark font-medium max-w-3xl mx-auto leading-relaxed">
            A legacy of trust, purity, and excellence spanning over six decades
          </p>
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-2xl shadow-ms-card p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ms-purple-light to-ms-violet-light rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ms-violet-light to-ms-purple-light rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ms-purple mb-8 text-center">
              Founded by Late Ramchandra Vishnu Mangarule
            </h2>
            <div className="text-center mb-8">
              <span className="inline-block bg-gradient-to-r from-ms-purple to-ms-violet text-white px-6 py-2 rounded-full font-heading font-semibold text-lg">
                Est. 1957
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ms-purple mb-2">Founder of Satara Saraf Association (SSA)</h3>
                    <p className="text-ms-dark">Established the foundation for jewelry excellence in Satara region</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ms-purple mb-2">Chairman of Satara Saraf Association</h3>
                    <p className="text-ms-dark">Led the association with distinction for 25 years</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ms-purple mb-2">Vice Chairman of Maharashtra Saraf Association</h3>
                    <p className="text-ms-dark">Represented the jewelry industry at state level</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ms-purple mb-2">100% Surety in Purity</h3>
                    <p className="text-ms-dark">Trustworthy and reliable with wide variety of gold and silver jewelry designs with stone work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-ms-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ms-purple mb-3">Purity Guaranteed</h3>
            <p className="text-ms-dark">100% assurance in the purity of our gold and silver jewelry</p>
          </div>

          <div className="bg-white rounded-xl shadow-ms-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ms-purple mb-3">Trustworthy</h3>
            <p className="text-ms-dark">Six decades of trusted service and customer satisfaction</p>
          </div>

          <div className="bg-white rounded-xl shadow-ms-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-ms-purple to-ms-violet rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ms-purple mb-3">Excellence</h3>
            <p className="text-ms-dark">Wide variety of gold and silver jewelry designs with exquisite stone work</p>
          </div>
        </div>

        {/* Legacy Quote */}
        <div className="bg-gradient-to-r from-ms-purple to-ms-violet rounded-2xl p-8 md:p-12 text-white text-center">
          <blockquote className="text-2xl md:text-3xl font-heading font-bold mb-6 leading-relaxed">
            "A legacy built on trust, purity, and excellence that continues to shine through generations."
          </blockquote>
          <p className="text-lg opacity-90">- Late Ramchandra Vishnu Mangarule (1957)</p>
        </div>
      </div>
    </div>
  );
}








