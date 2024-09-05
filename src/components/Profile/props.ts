export type ProfileInfo = {
  id: number;
  attributes: {
    name: string;
    about: string;
    slug: string;
    emailId: string;
    domain: string;
    jobTitle: string;
    company: string;
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
    location: string;
    linkedIn: string;
    showWhatsapp: boolean;
    profilePhoto: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};
