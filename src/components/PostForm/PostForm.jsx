import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import dbService from "../../appwrite/db";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "public"
        }
    });
    
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        setError("")

        if (post) {
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            if(file === false) {
                setError("Failed to upload the image file.")
                return
            }

            const dbPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
                if (file)
                    dbService.deleteFile(post.featuredImage);
            } else {
                setError("Failed to update the post.")
                if (file)
                    dbService.deleteFile(file.$id);
            }
        } else {

            const file = await dbService.uploadFile(data.image[0])

            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await dbService.createPost(userData.$id , data);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    dbService.deleteFile(file.$id)
                    setError("Failed to create the post.")
                }

            } else {
                setError("Failed to upload the image file.")
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!post && name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div>

            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        required
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        disabled={post}
                        required
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>


                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        required={!post}
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={dbService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["public", "private"]}
                        label="Visibility"
                        className="mb-4"
                        required
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} bgHoverColor={post ? "hover:bg-green-700" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>

                    {error && <p className="text-red-700 mt-8 text-center font-semibold">{error}</p>}

                </div>
            </form>
        </div>
    );
} 