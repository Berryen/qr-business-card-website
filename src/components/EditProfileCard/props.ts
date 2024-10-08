export type ProfileInfo = {
  id: number;
  attributes: {
    name: string;
    about: string;
    slug: string;
    email: string;
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
          id: number;
          url: string;
        };
      };
    };
    cv: {
      data: {
        attributes: {
          id: number;
          name: string;
          url: string;
        };
      };
    };
  };
};
