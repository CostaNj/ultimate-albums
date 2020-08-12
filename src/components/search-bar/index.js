import React, { useCallback} from 'react'
import { Formik }  from 'formik'

import styles from './search-bar.css'

export const SearchBar = () => {
    const handleSubmit = useCallback((values, actions) => {
        actions.setSubmitting(false)
        actions.resetForm()
    }, [])

    const handleRules = useCallback((values) => {
        let errors = {}

        if(!values.search) {
            errors.search = 'Required'
        }

        return errors
    }, [])

    return (
        <Formik
            initialValues={{ search: '' }}
            validate={handleRules}
            onSubmit={handleSubmit}
        >
            {
                ({
                     errors,
                     values,
                     handleSubmit,
                     handleChange,
                     isSubmitting,
                     handleBlur,
                     touched
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.searchForm}>
                            <input
                                className={styles.searchInput}
                                placeholder="Enter release name"
                                size="4"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                required=""
                                type="text"
                                autoFocus
                                name="search"
                                value={values.search}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.searchBtn}>
                                <span>Search</span>
                            </button>
                        </div>
                        { errors.search && touched.search && <div style={{color: 'red'}}>{ errors.search }</div>}
                    </form>
                )
            }
        </Formik>
    )
}