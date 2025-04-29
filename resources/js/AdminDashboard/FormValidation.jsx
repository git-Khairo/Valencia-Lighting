import { useState } from 'react';

const FormValidation = ({ formData, addType, isEditing, setErrors }) => {
  // Validate file size in MB
  const validateFileSize = (file, maxSizeMB) => {
    if (!file) return true;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  };

  // Validate file type
  const validateFileType = (file, mimes) => {
    if (!file) return true;
    const validMimes = mimes.split(',');
    const fileType = file.type.split('/')[1];
    return validMimes.includes(fileType) || validMimes.includes(file.name.split('.').pop().toLowerCase());
  };

  // Validation rules based on addType
  const validateForm = () => {
    const newErrors = {};

    if (addType === 'Product') {
      // Name: required, string, max:15
      if (!formData.name && (!isEditing || formData.name !== undefined)) {
        newErrors.name = 'The product name is required.';
      } else if (typeof formData.name !== 'string') {
        newErrors.name = 'The product name must be a string.';
      } else if (formData.name.length > 30) {
        newErrors.name = 'The name must not exceed 30 characters.';
      }

      // Title: required, string, max:255
      if (!formData.title && (!isEditing || formData.title !== undefined)) {
        newErrors.title = 'The title is required.';
      } else if (typeof formData.title !== 'string') {
        newErrors.title = 'The title must be a string.';
      } else if (formData.title.length > 50) {
        newErrors.title = 'The title must not exceed 50 characters.';
      }

      // Material: required, string, max:255
      if (!formData.material && (!isEditing || formData.material !== undefined)) {
        newErrors.material = 'The material is required.';
      } else if (typeof formData.material !== 'string') {
        newErrors.material = 'The material must be a string.';
      } else if (formData.material.length > 255) {
        newErrors.material = 'The material must not exceed 255 characters.';
      }

      // Product Number: required, string, max:255
      if (!formData.productNumber && (!isEditing || formData.productNumber !== undefined)) {
        newErrors.productNumber = 'The product Number is required.';
      } else if (typeof formData.productNumber !== 'string') {
        newErrors.productNumber = 'The product Number must be a string.';
      } else if (formData.productNumber.length > 255) {
        newErrors.productNumber = 'The product Number must not exceed 255 characters.';
      }

      // Length: required, string, max:255
      if (!formData.length && (!isEditing || formData.length !== undefined)) {
        newErrors.length = 'The length is required.';
      } else if (typeof formData.length !== 'string') {
        newErrors.length = 'The length must be a string.';
      } else if (formData.length.length > 255) {
        newErrors.length = 'The length must not exceed 255 characters.';
      }

      // Color: required, string, max:255
      if (!formData.color && (!isEditing || formData.color !== undefined)) {
        newErrors.color = 'The color is required.';
      } else if (typeof formData.color !== 'string') {
        newErrors.color = 'The color must be a string.';
      } else if (formData.color.length > 255) {
        newErrors.color = 'The color must not exceed 255 characters.';
      }

      // Accessories: required, string, max:255
      if (!formData.accessories && (!isEditing || formData.accessories !== undefined)) {
        newErrors.accessories = 'The accessories is required.';
      } else if (typeof formData.accessories !== 'string') {
        newErrors.accessories = 'The accessories must be a string.';
      } else if (formData.accessories.length > 255) {
        newErrors.accessories = 'The accessories must not exceed 255 characters.';
      }

      // Description: required, string
      if (!formData.description && (!isEditing || formData.description !== undefined)) {
        newErrors.description = 'The description is required.';
      } else if (typeof formData.description !== 'string') {
        newErrors.description = 'The description must be a string.';
      }

      // Brand: required, string, max:255
      if (!formData.brand && (!isEditing || formData.brand !== undefined)) {
        newErrors.brand = 'The brand is required.';
      } else if (typeof formData.brand !== 'string') {
        newErrors.brand = 'The brand must be a string.';
      } else if (formData.brand.length > 255) {
        newErrors.brand = 'The brand must not exceed 255 characters.';
      }

      // Image: required (for add), file, image, max:2MB
      if (!isEditing && !formData.image) {
        newErrors.image = 'The image is required.';
      } else if (formData.image && !validateFileType(formData.image, 'jpg,jpeg,png,gif,webp')) {
        newErrors.image = 'The image must be an image file (e.g., jpg, png).';
      } else if (!validateFileSize(formData.image, 2)) {
        newErrors.image = 'The image must not exceed 2MB.';
      }

      // Date of Release: required, date
      if (!formData.dateOfRelease && (!isEditing || formData.dateOfRelease !== undefined)) {
        newErrors.dateOfRelease = 'The date of release is required.';
      } else if (formData.dateOfRelease && !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfRelease)) {
        newErrors.dateOfRelease = 'The date of release must be a valid date.';
      }

      // Code: required, string, max:255
      if (!formData.code && (!isEditing || formData.code !== undefined)) {
        newErrors.code = 'The product code is required.';
      } else if (typeof formData.code !== 'string') {
        newErrors.code = 'The product code must be a string.';
      } else if (formData.code.length > 255) {
        newErrors.code = 'The product code must not exceed 255 characters.';
      }

      // Datasheet: required (for add), file, pdf, max:10MB
      if (!isEditing && !formData.datasheet) {
        newErrors.datasheet = 'The datasheet is required.';
      } else if (formData.datasheet && !validateFileType(formData.datasheet, 'pdf')) {
        newErrors.datasheet = 'The datasheet must be a PDF file.';
      } else if (!validateFileSize(formData.datasheet, 10)) {
        newErrors.datasheet = 'The datasheet must not exceed 10MB.';
      }

      // Category IDs: sometimes, array
      if (formData.selectedCategories && !Array.isArray(formData.selectedCategories)) {
        newErrors.selectedCategories = 'The category IDs must be an array.';
      }

      // Project IDs: sometimes, array
      if (formData.selectedProjects && !Array.isArray(formData.selectedProjects)) {
        newErrors.selectedProjects = 'The project IDs must be an array.';
      }
    } else if (addType === 'Category') {
      // Type: required, string, max:15
      if (!formData.type && (!isEditing || formData.type !== undefined)) {
        newErrors.type = 'The category type is required.';
      } else if (typeof formData.type !== 'string') {
        newErrors.type = 'The category type must be a string.';
      } else if (formData.type.length > 30) {
        newErrors.type = 'The category type must not exceed 30 characters.';
      }

      // Location: required, string, max:15
      if (!formData.location && (!isEditing || formData.location !== undefined)) {
        newErrors.location = 'The location is required.';
      } else if (typeof formData.location !== 'string') {
        newErrors.location = 'The location must be a string.';
      } else if (formData.location.length > 15) {
        newErrors.location = 'The location must not exceed 15 characters.';
      }

      // Image: required (for add), file, image, max:2MB
      if (!isEditing && !formData.image) {
        newErrors.image = 'The image is required.';
      } else if (formData.image && !validateFileType(formData.image, 'jpg,jpeg,png,gif,webp')) {
        newErrors.image = 'The image must be an image file (e.g., jpg, png).';
      } else if (!validateFileSize(formData.image, 2)) {
        newErrors.image = 'The image must not exceed 2MB.';
      }

      // Product IDs: sometimes, array
      if (formData.selectedProducts && !Array.isArray(formData.selectedProducts)) {
        newErrors.selectedProducts = 'The product IDs must be an array.';
      }
    } else if (addType === 'Project') {
      // Title: required, string, max:255
      if (!formData.title && (!isEditing || formData.title !== undefined)) {
        newErrors.title = 'The project title is required.';
      } else if (typeof formData.title !== 'string') {
        newErrors.title = 'The project title must be a string.';
      } else if (formData.title.length > 255) {
        newErrors.title = 'The project title must not exceed 255 characters.';
      }

      // Quote: required, string, max:255
      if (!formData.quote && (!isEditing || formData.quote !== undefined)) {
        newErrors.quote = 'The quote is required.';
      } else if (typeof formData.quote !== 'string') {
        newErrors.quote = 'The project quote must be a string.';
      } else if (formData.quote.length > 255) {
        newErrors.quote = 'The project quote must not exceed 255 characters.';
      }

      // Location: required, string, max:255
      if (!formData.location && (!isEditing || formData.location !== undefined)) {
        newErrors.location = 'The project location is required.';
      } else if (typeof formData.location !== 'string') {
        newErrors.location = 'The project location must be a string.';
      } else if (formData.location.length > 255) {
        newErrors.location = 'The project location must not exceed 255 characters.';
      }

      // Partners: required, string, max:255
      if (!formData.partners && (!isEditing || formData.partners !== undefined)) {
        newErrors.partners = 'The project partners is required.';
      } else if (typeof formData.partners !== 'string') {
        newErrors.partners = 'The project partners must be a string.';
      } else if (formData.partners.length > 255) {
        newErrors.partners = 'The project partners must not exceed 255 characters.';
      }

      // Images: required (for add), array of images, each max:2MB
      if (!isEditing && (!formData.images || formData.images.length === 0)) {
        newErrors.images = 'At least one image is required.';
      } else if (formData.images) {
        if (!Array.isArray(formData.images)) {
          newErrors.images = 'The images must be an array.';
        } else {
          formData.images.forEach((image, index) => {
            if (!validateFileType(image, 'jpg,jpeg,png,gif,webp')) {
              newErrors[`images[${index}]`] = `Image ${index + 1} must be an image file (e.g., jpg, png).`;
            } else if (!validateFileSize(image, 2)) {
              newErrors[`images[${index}]`] = `Image ${index + 1} must not exceed 2MB.`;
            }
          });
        }
      }

      // Description: required, string
      if (!formData.description && (!isEditing || formData.description !== undefined)) {
        newErrors.description = 'The description is required.';
      } else if (typeof formData.description !== 'string') {
        newErrors.description = 'The description must be a string.';
      }

      
      // Description: required, string
      if (!formData.paragraph[0].title && (!isEditing || formData.paragraph[0].title !== undefined)) {
        newErrors.paragraph[0].title = 'The title is required.';
      } else if (typeof formData.paragraph[0].title !== 'string') {
        newErrors.paragraph[0].title = 'The title must be a string.';
      }
      
      // Description: required, string
      if (!formData.paragraph[0].paragraph && (!isEditing || formData.paragraph[0].paragraph !== undefined)) {
        newErrors.paragraph[0].paragraph = 'The description is required.';
      } else if (typeof formData.paragraph[0].paragraph !== 'string') {
        newErrors.paragraph[0].paragraph = 'The description must be a string.';
      }
      
      // Description: required, string
      if (!formData.paragraph[1].title && (!isEditing || formData.paragraph[1].title !== undefined)) {
        newErrors.paragraph[1].title = 'The title is required.';
      } else if (typeof formData.paragraph[1].title !== 'string') {
        newErrors.paragraph[1].title = 'The title must be a string.';
      }
      
      // Description: required, string
      if (!formData.paragraph[1].paragraph && (!isEditing || formData.paragraph[1].paragraph !== undefined)) {
       newErrors.paragraph[1].paragraph = 'The description is required.';
     } else if (typeof formData.paragraph[1].paragraph !== 'string') {
       newErrors.paragraph[1].paragraph = 'The description must be a string.';
     }
      // Date of Project: required, date
      if (!formData.dateOfProject && (!isEditing || formData.dateOfProject !== undefined)) {
        newErrors.dateOfProject = 'The date of project is required.';
      } else if (formData.dateOfProject && !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfProject)) {
        newErrors.dateOfProject = 'The date of project must be a valid date.';
      }

      // Product IDs: sometimes, array
      if (formData.selectedProducts && !Array.isArray(formData.selectedProducts)) {
        newErrors.selectedProducts = 'The product IDs must be an array.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return {
    validateForm,
  };
};

export default FormValidation;