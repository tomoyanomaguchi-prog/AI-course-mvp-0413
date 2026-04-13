export type ItemRow = {
  id: string;
  user_id: string;
  name: string;
  next_purchase_on: string;
  last_purchased_on: string | null;
  total_capacity_ml: number | null;
  daily_use_ml: number | null;
  photo_path: string | null;
  created_at: string;
  updated_at: string;
};
