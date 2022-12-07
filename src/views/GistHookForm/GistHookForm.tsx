import React from "react";
import FormHookField from "../../components/FormHookField/FormHookField";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import {
  StyledDiv,
  FormContainer,
  MarginDiv,
} from "../GistForm/GistForm.styles";
import { createNewGist, editGist } from "../../api/api";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, Controller, useFieldArray } from "react-hook-form";

export default function GistHookForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const validationSchema = Yup.object({
    description: Yup.string()
      .required("Required")
      .min(4, "Description must be at least 4 characters"),
    files: Yup.array(
      Yup.object({
        filename: Yup.string().required(),
        content: Yup.string().required(),
      })
    ),
  });

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      files: [{ filename: "", content: "" }],
      //   filename: "",
      //   content: "",
      description: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "files", // unique name for your Field Array
  });

  const initialValues = {
    files: [{ filename: "", content: "" }],
    description: "",
  };

  if (state) {
    initialValues.description = state.description;
    initialValues.files = state.files;
    console.log(initialValues);
  }

  const submitForm = async (data: any) => {
    console.log(data);

    // if (state) {
    //   const response = await editGist(
    //     state.id,
    //     data.description,
    //     data.files
    //   );
    // } else {
    //   const response = await createNewGist(data.description, data.files);
    // }
    // navigate("/");
  };
  console.log("errors", errors);

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormHookField
                  {...register("description")}
                  {...field}
                  id={"description"}
                  customstyle="dark"
                  label={"Enter description..."}
                  fullWidth
                  variant={"outlined"}
                  size="small"
                />
              )}
            />

            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <MarginDiv>
                    {index !== 0 && (
                      <CancelIcon
                        onClick={() => remove(index)}
                        sx={{
                          position: "absolute",
                          left: -35,
                          cursor: "pointer",
                        }}
                      />
                    )}
                    <Controller
                      name={`files.${index}.filename`}
                      defaultValue={item.filename}
                      control={control}
                      render={({ field }) => (
                        <FormHookField
                          // {...register("filename")}
                          {...field}
                          // id={"filename"}
                          customstyle="dark"
                          label={"Enter file name..."}
                          fullWidth
                          variant={"outlined"}
                          size="small"
                        />
                      )}
                    />
                  </MarginDiv>
                  <MarginDiv>
                    <Controller
                      name={`files.${index}.content`}
                      control={control}
                      defaultValue={item.content}
                      render={({ field }) => (
                        <FormHookField
                          // {...register("content")}
                          {...field}
                          id={"content"}
                          customstyle="dark"
                          label={"Enter file content..."}
                          fullWidth
                          variant={"outlined"}
                          size="small"
                          multiline
                          rows={10}
                        />
                      )}
                    />
                  </MarginDiv>
                </div>
              );
            })}
          </div>
          <StyledDiv>
            <Button
              onClick={() => {
                append({ filename: "", content: "" });
              }}
              customstyle="dark"
              text="Add File"
            ></Button>
            <Button
              customstyle="dark"
              type={"submit"}
              text={state ? "Update Gist" : "Create Gist"}
            ></Button>
          </StyledDiv>
        </form>
      </FormContainer>
    </div>
  );
}
