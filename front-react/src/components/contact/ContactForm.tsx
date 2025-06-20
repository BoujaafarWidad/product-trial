import { useState } from "react";
import type { ContactFormData, FormErrors } from "./Contact";
import { Check, Mail, Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est obligatoire';
    } else if (formData.message.length > 300) {
      newErrors.message = 'Le message doit faire moins de 300 caractères';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ email: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  const characterCount: number = formData.message.length;
  const isOverLimit: boolean = characterCount > 300;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Mail className="mr-3 text-blue-600" size={28} />
            Contact
          </h1>
          <p className="text-gray-600 mt-2">
            Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div className="p-6">
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <Check className="text-green-600 mr-3" size={20} />
              <span className="text-green-800 font-medium">
                Demande de contact envoyée avec succès
              </span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-start">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <span className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                  {characterCount}/300
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Écrivez votre message ici..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={16} />
                    Envoyer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;