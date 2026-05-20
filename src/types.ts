export interface Service {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'full' | 'specialty';
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleType: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  vehicle: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  category: string;
}
