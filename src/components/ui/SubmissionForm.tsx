
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileUp, Plus, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitPayloadGuide } from '@/lib/api';

const SubmissionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    category: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'Launch Vehicles',
    'Spacecraft',
    'Space Stations',
    'Satellites',
    'Landers',
    'Rovers',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your guide",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.company.trim()) {
      toast({
        title: "Company required",
        description: "Please enter your company name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description for your guide",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your guide",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedFile) {
      toast({
        title: "File required",
        description: "Please upload your payload guide document",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the file and thumbnail to storage
      // and send the URLs along with the form data
      const fileUrl = URL.createObjectURL(selectedFile);
      const fileType = selectedFile.type.split('/')[1].toUpperCase();
      const fileSize = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      
      const thumbnailUrl = thumbnail || 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80';
      
      const result = await submitPayloadGuide({
        ...formData,
        thumbnail: thumbnailUrl,
        fileUrl,
        fileType,
        fileSize,
      });
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Submission successful",
          description: result.message,
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            title: '',
            company: '',
            description: '',
            category: '',
            tags: [],
          });
          setSelectedFile(null);
          setThumbnail(null);
          setIsSuccess(false);
        }, 3000);
      } else {
        toast({
          title: "Submission failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium mb-4">Submission Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Your payload guide has been submitted successfully and is pending review. 
          You will be notified once it's approved and published on the platform.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mx-auto"
        >
          Submit Another Guide
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-medium">Submit Payload Guide</h2>
          <p className="text-muted-foreground">
            Share your company's payload user guide with the space community
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Guide Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Falcon 9 Payload User's Guide"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., SpaceX"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="form-input min-h-[100px]"
            placeholder="Provide a brief description of this payload guide..."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="form-input rounded-r-none flex-1"
              placeholder="Add tags (e.g., falcon, spacex, leo)"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              className="rounded-l-none"
              disabled={!tagInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to add a tag
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Guide Document <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                selectedFile ? 'border-accent/50 bg-accent/5' : 'border-border hover:border-muted-foreground/50'
              } transition-colors cursor-pointer`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <FileUp className="h-8 w-8 text-accent mb-2" />
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload your guide (PDF, DOC, PPT)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Cover Image (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                thumbnail ? 'border-accent/50 bg-accent/5' : 'border-border hover:border-muted-foreground/50'
              } transition-colors cursor-pointer`}
              onClick={() => document.getElementById('thumbnail-upload')?.click()}
            >
              <input
                type="file"
                id="thumbnail-upload"
                onChange={handleThumbnailChange}
                className="hidden"
                accept="image/*"
              />
              
              {thumbnail ? (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded overflow-hidden mb-2">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload a cover image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Before you submit</p>
            <p className="mt-1">
              Ensure your guide is up-to-date and doesn't contain any sensitive or proprietary information
              that shouldn't be shared publicly. All submissions will be reviewed before being published.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Guide'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SubmissionForm;
