import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Define the validation schema
const formSchemas = {
  Project: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL"),
    image: z.string().url("Invalid URL"),
  }),
  Experience: z.object({
    skill: z.string().min(1, "Skill is required"),
    description: z.string().min(1, "Description is required"),
    level: z.string().min(1, "Level is required"),
    site: z.string().min(1, "Site is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
  }),
  Education: z.object({
    skill: z.string().min(1, "Skill is required"),
    description: z.string().min(1, "Description is required"),
    level: z.string().min(1, "Level is required"),
    site: z.string().min(1, "Site is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
  }),
  Skill: z.object({
    name: z.string().min(1, "Name is required"),
  }),
};

const AddItemDialog = ({ open, onClose, onSave, type }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [actualFile, setActualFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (
        file.size > MAX_FILE_SIZE ||
        !ALLOWED_FILE_TYPES.includes(file.type)
      ) {
        toast({
          title: "Invalid file",
          description:
            "Image must be less than 10MB and of type JPEG, PNG, or GIF",
          variant: "destructive",
        });
        return;
      }

      // Revoke old URL if exists
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      const newUrl = URL.createObjectURL(file);
      setImageUrl(newUrl);
      setActualFile(file);

      // Update formData with image URL
      setFormData((prev) => ({
        ...prev,
        image: newUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleEmptyForm = () => {
    setFormData({});
    setImageUrl("");
    setActualFile(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate data first
      const validatedData = formSchemas[type].parse(formData);

      let uploadedImageUrl = "";

      // Only proceed with image upload if we have an actual file and it's a Project type
      if (actualFile && type === "Project") {
        const uploadFormData = new FormData();
        uploadFormData.append("file", actualFile);

        toast({
          title: "Uploading image",
          description: "Please wait while we upload your image.",
        });

        try {
          const response = await axios.post("/api/upload", uploadFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          uploadedImageUrl =
            response.data?.result?.secure_url || response.data?.result?.url;

          setFormData((prev) => ({
            ...prev,
            image: uploadedImageUrl,
          }));

          toast({
            title: "Success",
            description: "Image uploaded successfully",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "Failed to upload image, check you internet connection and try again",
          });
          return;
        }
      }

      // Create final data object with the uploaded image URL if available
      const finalData = {
        ...validatedData,
        ...(uploadedImageUrl && { image: uploadedImageUrl }),
      };

      await onSave(finalData);

      toast({
        title: "Success",
        description: `${type} added successfully`,
      });

      setFormData({});
      setImageUrl("");
      setActualFile(null);
      setErrors({});
      onClose();
    } catch (error) {
      const formattedErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save data",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFields = () => {
    const renderField = (label, name) => (
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
          {label}
        </Label>
        <div className="col-span-3">
          {name === "image" ? (
            <div>
              <Input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={errors[name] ? "border-red-500" : ""}
              />
              {imageUrl && (
                <div className="relative w-full h-[200px]">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <X />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Input
              id={name}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className={errors[name] ? "border-red-500" : ""}
            />
          )}
          {errors[name] && (
            <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
          )}
        </div>
      </div>
    );

    switch (type) {
      case "Project":
        return (
          <>
            {renderField("Name", "name")}
            {renderField("Description", "description")}
            {renderField("Link", "link")}
            {renderField("Image URL", "image")}
          </>
        );
      case "Experience":
      case "Education":
        return (
          <>
            {renderField("Skill", "skill")}
            {renderField("Description", "description")}
            {renderField("Level", "level")}
            {renderField("Site", "site")}
            {renderField("Start Time", "start_time")}
            {renderField("End Time", "end_time")}
          </>
        );
      case "Skill":
        return renderField("Name", "name");
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {type}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{renderFields()}</div>
        <DialogFooter>
          <div className="w-full flex max-md:flex-col-reverse items-center justify-between max-md:gap-2">
            <Button
              variant="secondary"
              onClick={() => handleEmptyForm()}
              className="max-md:w-full"
            >
              Empty form
            </Button>
            <div className="max-md:w-full flex max-md:flex-col-reverse items-center gap-2">
              <Button
                variant="outline"
                onClick={() => onClose(false)}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
