interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.APP_MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "guilhermeaandrade91@gmail.com",
      name: "Guilherme Andrade",
    },
  },
} as IMailConfig;
