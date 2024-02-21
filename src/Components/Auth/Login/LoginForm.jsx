import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import SettingContext from '@/Helper/SettingContext';
import useHandleLogin from '@/Utils/Hooks/Auth/useLogin';
import { YupObject, emailSchema, passwordSchema, recaptchaSchema } from '@/Utils/Validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import { ErrorMessage, Form, Formik } from 'formik';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Col, Input, Label } from 'reactstrap';

const LoginForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const {settingData } = useContext(SettingContext);
  const reCaptchaRef = useRef()

  const { mutate, isLoading } = useHandleLogin();
  return (
    <Formik
      initialValues={{
        email: 'john.customer@example.com',
        password: '123456789',
        recaptcha: ''
      }}
      validationSchema={YupObject({
        email: emailSchema,
        password: passwordSchema,
        recaptcha: settingData?.google_reCaptcha?.status ?recaptchaSchema :""
      })}
      onSubmit={mutate}>
      {({errors, touched, setFieldValue}) => (
        <Form className='row g-4'>
          <SimpleInputField
            nameList={[
              { name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'Email Address' },
              { name: 'password', placeholder: t('EnterPassword'), type: 'password', title: 'Password', label: 'Password' },
            ]}
          />
          {settingData?.google_reCaptcha?.status &&
            <Col sm="12">
                <ReCAPTCHA                 
                  ref={reCaptchaRef}
                  sitekey={settingData?.google_reCaptcha?.site_key}
                  onChange={(value) => {
                    setFieldValue('recaptcha', value);
                  }}
                />
              {errors.recaptcha && touched.recaptcha && <ErrorMessage name="recaptcha" render={(msg) =><div className="invalid-feedback d-block">{errors.recaptcha}</div>} />}
            </Col>
          }
          <Col xs={12}>
            <div className='forgot-box'>
              <div className='form-check remember-box'>
                <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                <Label className='form-check-label' htmlFor='flexCheckDefault'>
                  {t('Rememberme')}
                </Label>
              </div>
              <Link href={`/${i18Lang}/auth/forgot-password`} className='forgot-password'>
                {t('ForgotPassword')}?
              </Link>
            </div>
          </Col>
          <FormBtn title={'LogIn'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;