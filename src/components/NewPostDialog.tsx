import {Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Cancel, Save} from "@mui/icons-material";
import * as Yup from "yup";
import {CreatePost} from "../types.ts";
import {useFormik} from "formik";

interface NewPostDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleSave: (post: CreatePost) => void;
    existingTags: string[];
}

const NewPostDialog = ({isOpen, handleClose, handleSave, existingTags}: NewPostDialogProps) => {
    const formik = useFormik<CreatePost>({
        initialValues: {
            title: '',
            body: '',
            tags: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().min(1).max(255).required(),
            body: Yup.string().min(1).max(2500).required(),
            tags: Yup.array().min(1).max(5).required(),
        }),
        onSubmit: handleSave,
    })

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                sx: {width: 600},
            }}
        >
            <DialogTitle>Add a post</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} py={1}>
                        <TextField name="title" label="Title" fullWidth
                                   value={formik.values.title} onChange={formik.handleChange}
                                   error={formik.touched.title && Boolean(formik.errors.title)}
                                   helperText={formik.touched.title && formik.errors.title} />
                        <TextField name="body" label="Body" fullWidth
                                   value={formik.values.body} onChange={formik.handleChange}
                                   error={formik.touched.body && Boolean(formik.errors.body)}
                                   helperText={formik.touched.body && formik.errors.body}
                                   multiline rows={10} />
                        <Autocomplete
                            multiple
                            onChange={(_, value) =>
                                formik.setFieldValue('tags', value)
                            }
                            value={formik.values.tags}
                            renderInput={(params) =>
                                <TextField label="Tags" {...params}
                                           error={formik.touched.tags && Boolean(formik.errors.tags)}
                                           helperText={formik.touched.tags && formik.errors.tags} />
                            }
                            options={existingTags}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<Cancel />}>Cancel</Button>
                    <Button type="submit" startIcon={<Save />}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default NewPostDialog
