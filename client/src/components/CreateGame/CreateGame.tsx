import React, { useMemo, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../App/Hooks/Hooks";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import PreviewImage from "./PreviewImage";
import CustomSelect from "./CustomSelect";
import FieldImage from "./FieldImage";
import { deepCleanUp, postGame, getAllGames } from "../../App/actions/actionGames";
import { IoRefreshOutline } from "react-icons/io5";
import styles from "./CreateGame.module.css";
import LoadingBar from 'react-top-loading-bar'

interface initialStateInterface {
  name: string;
  description: string;
  platforms: string[];
  image: string;
  released: string;
  rating: string;
  genres: string[];
}

let initialState: initialStateInterface = {
  name: "",
  description: "",
  platforms: [],
  image: "",
  released: "",
  rating: "",
  genres: [],
};

const CreateGame = () => {
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((state) => state.allGames);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { isOpen, toggle } = useModal();

  useLayoutEffect(() => {
    !allGames.length && dispatch(getAllGames());
  }, [allGames.length, dispatch]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Videogames");
    formData.append("api_key", "753287279619279");
    const config = {
      onUploadProgress: (e:any) => {
        const {loaded, total} = e
        setProgress(loaded/total*100)
      }
    }
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dqwkfdxvl/image/upload",
      formData,
      config
    );
    return res.data.secure_url;
  };

  const platformsOptions = useMemo(() => {
    return Array.from(new Set(allGames.map((g) => g.platforms).flat()))
      .sort()
      .map((c) => ({ value: c, label: c }));
  }, [allGames]);

  const genresOptions = useMemo(() => {
    return Array.from(new Set(allGames.map((g) => g.genres).flat()))
      .sort()
      .map((c) => ({ value: c, label: c }));
  }, [allGames]);

  const onSubmit = async (values: any, actions: any) => {
    try {
      let imageURL = "https://i.ibb.co/mGWK9DK/No-image-available.jpg"
      if(typeof values.image !== "string") {
        imageURL = await uploadToCloudinary(values.image);
      }
      await dispatch(postGame({ ...values, image: imageURL }));
      toggle();
      actions.setSubmitting(false);
      actions.resetForm();
      // (document.getElementById("input_image") as HTMLInputElement).value = ""
      dispatch(deepCleanUp());
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  return (
    <div className={styles.container}>
       <LoadingBar
        color='rgb(64, 178, 8)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <button className={styles.btn__back} onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <h3 className={styles.title}>CREATE VIDEOGAME'S CARD</h3>
      <Formik initialValues={initialState} onSubmit={onSubmit}>
        {({
          handleReset,
          dirty,
          isSubmitting,
          resetForm,
          values,
          errors,
          setFieldValue,
        }: any) => (
          <Form autoComplete="off" className={styles.form_container}>
            <div className={styles.item_name}>
              <label htmlFor="name" className={styles.name_property}>
                Name
              </label>
              <Field
                className={styles.field}
                name="name"
                placeholder="God of Wars"
                type="text"
                required={true}
                validate={(value: string) => {
                  if (!(value.toString()?.replace(/^\s+|\s+$/, "")).length)
                    return "Please fill in this field.";
                  if (value[0] === " ") return "Please remove leading spaces.";
                  if (value[value.length - 1] === " ")
                    return "Please remove trailing spaces.";
                  if (!/^[a-zA-Z0-9\u00C0-\u017F" "]{2,20}$/.test(value))
                    return "Name must contain 2 to 20 alphanumeric characters";
                  return;
                }}
              />
              <ErrorMessage
                name="name"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_released}>
              <label htmlFor="released" className={styles.name_property}>
                Released
              </label>
              <Field
                className={styles.field}
                name="released"
                required={true}
                type="date"
              />
              <ErrorMessage
                name="released"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_platforms}>
              <label htmlFor="platforms" className={styles.name_property}>
                Platforms
              </label>
              <Field
                className={styles["custom-select"]}
                name="platforms"
                options={platformsOptions}
                component={CustomSelect}
                handleReset={handleReset}
                placeholder="Select platforms"
                isMulti={true}
                validate={(value: string) => {
                  if (!value?.length) return "Please fill in this field.";
                  if (value?.length > 3) return "Select maximum 3 platforms";
                  return;
                }}
              />
              <ErrorMessage
                name="platforms"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_genres}>
              <label htmlFor="genres" className={styles.name_property}>
                Genres
              </label>
              <Field
                className={styles["custom-select"]}
                name="genres"
                options={genresOptions}
                component={CustomSelect}
                placeholder="Select a Genres"
                isMulti={true}
                validate={(value: string) => {
                  if (!value?.length) return "Please fill in this field.";
                  return;
                }}
              />
              <ErrorMessage
                name="genres"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_rating}>
              <label htmlFor="rating" className={styles.name_property}>
                Rating
              </label>
              <Field
                className={styles.field}
                name="rating"
                required={true}
                placeholder="1"
                type="number"
                step="0.01"
                min="0.00"
                max="5.00"
                validate={(value: string) => {
                  if (!(/^[0,1,2,3,4,5](\.\d{1,2})?$/.test(value)) && Number(value) < 5) {
                    return "Select a value from 1 to 5";
                  }
                  return;
                }}
              />
              <ErrorMessage
                name="rating"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_image}>
              <label htmlFor="image" className={styles.name_property}>
                Image
              </label>
              <FieldImage
                data={values}
                errors={errors}
                setFieldValue={setFieldValue}
              />
              <PreviewImage file={values.image} />
            </div>

            <div className={styles.item_description}>
              <label htmlFor="description" className={styles.name_property}>
                Description
              </label>
              <Field
                as="textarea"
                className={styles.field}
                name="description"
                placeholder="It is a new beginning for Kratos. Living as..."
                required={true}
                validate={(value: string) => {
                  if (!(value.toString()?.replace(/^\s+|\s+$/, "")).length)
                    return "Please fill in this field.";
                  if (value[0] === " ") return "Please remove leading spaces.";
                  if (value[value.length - 1] === " ")
                    return "Please remove trailing spaces.";
                  if (!/^[a-zA-Z0-9\u00C0-\u017F" "]{0,500}$/.test(value))
                    return "Description must contain 0 to 500 alphanumeric characters.";
                  return;
                }}
              />
              <ErrorMessage
                name="description"
                component="small"
                className={styles.field_error}
              />
            </div>

            <div className={styles.item_buttons}>
              <button
                type="submit"
                className={styles.submit_btn}
                disabled={!dirty}
              >
                CREATE
              </button>
              <button
                className={styles.reset_btn}
                type="button"
                onClick={resetForm}
                disabled={!dirty || isSubmitting}
              >
                <IoRefreshOutline size="1.4em" />
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {isOpen && (
        <div>
          <Modal isOpen={isOpen} toggle={toggle}>
            <p>Game created!</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
