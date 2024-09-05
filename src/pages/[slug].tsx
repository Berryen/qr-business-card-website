import { fetchStrapiAPI } from "helpers/api";
import { ProfileInfo } from "components/Profile/props";
import Profile from "components/Profile";

import React from "react";

interface ProfileProps {
  profileData: ProfileInfo;
}

const SlugPage = ({ profileData }: { profileData: ProfileInfo }) => {
  return (
    <>
      <Profile profileData={profileData} />
    </>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const { slug } = params;
    const { data, meta } = await fetchStrapiAPI(`/profiles/${slug}`, {
      populate: "deep",
      // Other options if needed
    });

    const profileData: ProfileInfo = {
      id: data.id,
      attributes: {
        name: data.attributes.name,
        about: data.attributes.about,
        slug: data.attributes.slug,
        emailId: data.attributes.emailId,
        domain: data.attributes.domain,
        jobTitle: data.attributes.jobTitle,
        company: data.attributes.company,
        countryCodeMobile: data.attributes.countryCodeMobile,
        countryCodeOffice: data.attributes.countryCodeOffice,
        mobileNumber: data.attributes.mobileNumber,
        officeNumber: data.attributes.officeNumber,
        extensionNumber: data.attributes.extensionNumber,
        location: data.attributes.location,
        linkedIn: data.attributes.linkedIn,
        showWhatsapp: data.attributes.showWhatsapp,
        profilePhoto: {
          data: {
            attributes: {
              url: data.attributes.profilePhoto.data.attributes.url,
            },
          },
        },
      },

      // Map the data to your ProfileInfo type
      // Assuming you have a function to map data to ProfileInfo
    };

    return {
      props: {
        profileData,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      props: {
        profileData: {}, // Set an empty object or handle as needed
      },
    };
  }
};

export default SlugPage;
