import { Alert } from 'antd'
import React from 'react'

const ErrorAlert: React.FC<{ error: Error }> = ({ error }) => (
    <Alert
        message={`${error.name}: ${error.message}`}
        description={error.message}
        type="error"
    />
)

export default ErrorAlert
