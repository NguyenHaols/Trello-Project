import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { createNewReportAPI } from '~/apis'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

function Report({ open, onClose }) {
  const { t } = useTranslation()
  const handleSendReport = (values) => {
    const data = {
      ...values
    }
    createNewReportAPI(data)
    toast.success('Send report success')
    onClose()
  }
  const reportFormik = useFormik({
    initialValues: {
      title:'',
      description:'',
      email:''
    },
    validationSchema: Yup.object({
      title: Yup.string().min(4, t('minimum_4_characters')).max(30, t('maximum_30_characters')).required(t('requiured')),
      email: Yup.string().min(4, t('minimum_4_characters')).max(30, t('maximum_30_characters')).required(t('requiured')),
      description: Yup.string().min(4, t('minimum_4_characters')).max(300, t('maximum_300_characters')).required(t('requiured'))
    }),
    onSubmit: (values) => {
      handleSendReport(values)
    }
  })

  return (
    <Dialog open={open} onClose={onClose} sx={{ margin:'40px auto', '& .MuiPaper-root':{ width:'50%' } }}>
      <form onSubmit={reportFormik.handleSubmit}>
        <DialogTitle> {t('report')} </DialogTitle>
        <DialogContent>
          <TextField
            name="email"
            label={t('email')}
            size="small"
            fullWidth
            onChange={reportFormik.handleChange}
            onBlur={reportFormik.handleBlur}
            value={reportFormik.values.email}
            error={Boolean(reportFormik.errors.email && reportFormik.touched.email)}
            helperText={reportFormik.errors.email && reportFormik.touched.email ? reportFormik.errors.email : ''}
            sx={{ mt: '10px' }}

          />
          <TextField
            name="title"
            label={t('title')}
            size="small"
            fullWidth
            onChange={reportFormik.handleChange}
            onBlur={reportFormik.handleBlur}
            value={reportFormik.values.title}
            error={Boolean(reportFormik.errors.title && reportFormik.touched.title)}
            helperText={reportFormik.errors.title && reportFormik.touched.title ? reportFormik.errors.title : ''}
            sx={{ mt: '10px' }}
          />
          <TextField
            name="description"
            label={t('description')}
            size="small"
            fullWidth
            multiline
            rows={4}
            onChange={reportFormik.handleChange}
            onBlur={reportFormik.handleBlur}
            value={reportFormik.values.description}
            error={Boolean(reportFormik.errors.description && reportFormik.touched.description)}
            helperText={reportFormik.errors.description && reportFormik.touched.description ? reportFormik.errors.description : ''}
            sx={{ mt: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('cancel')}</Button>
          <Button type='submit'> {t('send')} </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Report