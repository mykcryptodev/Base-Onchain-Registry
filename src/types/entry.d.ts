type EntryContent = {
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  target_url: string;
  cta_text: string;
  function_signature: string;
  contract_address: string;
  token_id: string;
  token_amount: string;
  featured: boolean;
  creator_name: string;
  creator_image_url: string;
  curation: string;
  start_ts: string;
  expiration_ts: string;
};

export type Entry = {
  id: string;
  category: string;
  content?: EntryContent;
  updated_at: string | null;
  created_at: string;
}

export type EntryResponse = {
  data: Entry[];
  pagination: {
    total_records: number;
    current_page: number;
    total_pages: number;
    limit: number;
  };
};