import React from 'react';

const TermsCard = ({ title, children }) => (
  <div className="bg-[#E0F7FA] border border-[#1F9F90] rounded-xl p-6 md:p-8 mb-8 shadow-sm">
    <h2 className="text-xl md:text-2xl font-bold text-center text-black mb-6">
      {title}
    </h2>
    <ul className="list-disc pl-5 space-y-3 text-gray-800 text-sm md:text-base leading-relaxed">
      {children}
    </ul>
  </div>
);

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-black mb-16">
          Terms & Conditions
        </h1>

        {/* Registration and Fees */}
        <TermsCard title="Registration and Fees:">
          <li>Please enquire for your interests and we will try our best to accommodate.</li>
          <li>
            <span className="text-[#1F9F90]">Registration will be confirmed only after the payment is processed. The course fees can be paid online via UPI/bank transfer/Paytm/Razorpay</span>
          </li>
          <li>
            Anyone aged 9 years or above can register for our courses. The age group 9-15 will be placed in the Junior Batch. Anyone aged 16 years or above will be placed in the Adult Batch.
          </li>
          <li>
            <span className="text-[#1F9F90]">The Language Network reserves the right to postpone or cancel a batch in case the minimum number of students required for a batch have not registered.</span>
          </li>
          <li>The course fee includes all the study material required.</li>
        </TermsCard>

        {/* Attendance */}
        <TermsCard title="Attendance:">
          <li>
            Student is expected to attend all the classes regularly. Student is required to maintain a minimum of 75% attendance during the course. If the student fails to maintain minimum attendance, course completion certificate will not be provided.
          </li>
          <li>
            <span className="text-[#1F9F90]">We keep a track of each student’s attendance. In case you are unable to attend class, please try to inform us well in advance. Please NOTE that the teachers will not repeat the portion missed out by a student irrespective of the circumstances. There will be a separate revision class at the end of the course.</span>
          </li>
          <li>There will be a separate revision class at the end of the course.</li>
          <li>It is advised to join the class 5 minutes before the scheduled time.</li>
          <li>The study material and class link shall be provided to the students 48 hours prior to the start date.</li>
        </TermsCard>

        {/* Certification */}
        <TermsCard title="Certification:">
          <li>
            <span className="text-[#1F9F90]">A certificate of completion by The Language Network will be provided once you clear the final assessment conducted by us.</span>
          </li>
          <li>Certificates are issued within 2 weeks of course completion.</li>
          <li>
            In case of loss or misplacement of original certificates, issuing a duplicate certificate will incur an additional fee of Rs.500/-
          </li>
          <li>Certificate will be issued via mail.</li>
          <li>For Hardcopy Certificate a minimal amount of Rs.490 has to be paid</li>
        </TermsCard>

        {/* Change/Withdrawal of Batch */}
        <TermsCard title="Change/Withdrawal of Batch:">
          <li>
            Transfer from one batch to another batch of the same level <span className="text-[#1F9F90]">will only be allowed on payment of Rs. 3000/- on the basis of availability of seats in the preferred batch.</span>
          </li>
          <li>
            Fees once paid will <span className="text-[#1F9F90]">NOT be refunded</span> under any circumstances unless the course is cancelled by The Language Network.
          </li>
          <li>Receipts of payment shall be generated within 48 hours after registration and payment.</li>
        </TermsCard>

        {/* Online Class Etiquette */}
        <TermsCard title="Online Class Etiquette:">
          <li>It is important to recognize that online classroom is in fact a classroom, and certain behaviors are expected when you communicate with both your peers and instructors.</li>
          <li>The sessions will be conducted on the <span className="text-[#1F9F90]">Microsoft Teams</span> Try as much as possible to join the class with a stable internet connection.</li>
          <li>It is strongly recommended to join the class with a PC/MAC/Laptop instead of a mobile device for your own convenience and a smoother learning experience.</li>
          <li>Try to be in a space with as little background noise as possible to enhance your learning experience.</li>
          <li>Group batches will commence <span className="text-[#1F9F90]">within 14 days of your enrolment date</span>. Students will be added to the closest batch date available.</li>
        </TermsCard>

      </div>
    </div>
  );
};

export default TermsPage;
