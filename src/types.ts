/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Issue {
  id: string;
  issueNo: string;
  title: string;
  publishDate: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  facebookUrl: string;
  featured?: boolean;
  isSpecial?: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  avatarUrl: string;
  organization?: string;
  isInstitution?: boolean;
}

export interface SubmissionGuideline {
  id: string;
  text: string;
}

export interface CallForSubmission {
  title: string;
  theme: string;
  deadline: string;
  status: "OPEN" | "CLOSED";
  requirements: string[];
  submissionEmail: string;
  submissionPhone?: string;
  detailsLink?: string;
}

export interface ContactInfo {
  editorName: string;
  magazineName: string;
  location: string;
  phone: string;
  email: string;
  facebookUsername: string;
  facebookUrl: string;
}
