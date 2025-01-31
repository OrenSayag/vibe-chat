export interface WhatsappFlow {
  version: string;
  metadata?: WhatsappFlowMetadata;
  header?: WhatsappFlowHeader;
  buttons?: WhatsappFlowButton[];
  elements?: Element[];
}

export interface WhatsappFlowMetadata {
  name: string;
  locale?: string;
}

export interface WhatsappFlowHeader {
  title: string;
  subtitle?: string;
}

export interface WhatsappFlowButton {
  type: 'action' | 'submit' | 'cancel';
  label: string;
  action?: WhatsappFlowAction;
}

export interface WhatsappFlowAction {
  type: 'navigate' | 'submit';
  target?: string;
  payload?: any;
}

export interface WhatsappFlowElement {
  type: 'text' | 'image' | 'video' | 'button' | 'input';
  id: string;
  properties: WhatsappFlowElementProperties;
}

export interface WhatsappFlowElementProperties {
  text?: string;
  url?: string;
  placeholder?: string;
  options?: WhatsappFlowOption[];
}

export interface WhatsappFlowOption {
  label: string;
  value: string;
}
