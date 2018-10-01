# Sentry

Install the sentry command line utility

```bash
curl -sL https://sentry.io/get-cli/ | bash
```

### 1. Register for Sentry account

https://sentry.io/signup/

Now you can create a organization and your app.

### 2. Create auth token

Go to https://sentry.io/api/ and create new authorization token.

### 3. Store environment varibles to `.env`

Find your DSN by going to Project Settings and select **Client keys** from the side menu.

The ORG and PROJECT can be extracted from the URL on the same page:

sentry.io/<b>&lt;SENTRY_ORG&gt;</b>/<b>&lt;SENTRY_PROJECT&gt;</b>/settings/settings/


```
SENTRY_AUTH_TOKEN=<your generated auth token>
SENTRY_DSN=<dsn url>
SENTRY_ORG=<your organization slug>
SENTRY_PROJECT=<your project slug>
```
