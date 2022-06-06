import * as yup from 'yup';

export const PatientValidation = yup.object().shape({
  a_paye: yup.boolean().required(),
});
