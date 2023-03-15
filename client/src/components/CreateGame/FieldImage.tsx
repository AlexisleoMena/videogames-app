import { FunctionComponent, useEffect } from 'react';
import { FormikErrors } from "formik";

interface IFieldImage {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

const FieldImage: FunctionComponent<IFieldImage> = ({ data, setFieldValue, errors }) => {

  useEffect(() => {
    if(typeof data.image === "string" && data.image === "") {
      (document.getElementById("input_image") as HTMLInputElement).value = ""
    } 
  }, [data.image])

  return (
    <div>
      <input
        id="input_image"
        type="file"
        name="image"
        accept="image/png, .svg, .jpg, .jpeg"
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue("image", e.currentTarget.files[0]);
          }
        }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default FieldImage;
