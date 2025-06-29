import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreferences } from '@/store/slices/userSlice';
import { RootState } from '@/store';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

export const PreferencesPanel = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.user.preferences);

  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      dispatch(setPreferences(selected.filter((c) => c !== cat)));
    } else {
      dispatch(setPreferences([...selected, cat]));
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">🛠 Select Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selected.includes(cat) ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};