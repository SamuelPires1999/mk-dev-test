import "i18next";
import "react-i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: {
        form_nameLabel: string;
        form_ageLabel: string;
        form_companyLabel: string;
        form_emailLabel: string;
        form_submitButtonLabel: string;
        form_submitButtonLoading: string;
        card_name: string;
        card_age: string;
        card_email: string;
        card_company: string;
        mainTitle: string;
        clearUserButtonLabel: string;
        simulateApiErrorButtonLabel: string;
        listTitle: string;
      };
    };
  }
}
