import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Define the validation schema
const formSchemas = {
  Project: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL").optional(),
    image: z.string().url("Invalid URL").optional(),
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSave = () => {
    try {
      const validatedData = formSchemas[type].parse(formData);
      onSave(validatedData);
      setFormData({});
      setErrors({});
      onClose(false);
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  const renderFields = () => {
    const renderField = (label, name) => (
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
          {label}
        </Label>
        <div className="col-span-3">
          <Input
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={errors[name] ? "border-red-500" : ""}
          />
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
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
