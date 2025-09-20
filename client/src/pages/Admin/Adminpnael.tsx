'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminPanel = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin`, { credentials: 'include' });
        if (response.status === 401 || response.status === 403) {
          navigate('/login'); // Redirect to login page
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate('/login'); // Redirect on network error as well
      }
    };

    checkAdminAccess();
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news`, { credentials: 'include' });
      const data = await response.json();
      if (Array.isArray(data)) {
        setNewsArticles(data);
      } else {
        console.error('API returned non-array data for news articles:', data);
        setNewsArticles([]); // Ensure it's always an array
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('News title cannot be empty.');
      return;
    }
    // ReactQuill can return '<p><br></p>' for empty content, so check for that too
    if (!content.trim() || content === '<p><br></p>') {
      alert('News content cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    console.log('Content before appending to formData:', content);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (editing) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news/${editingId}`, {
          method: 'PUT',
          body: formData,
          credentials: 'include'
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
      }

      if (response.ok) {
        fetchNews();
        setTitle('');
        setContent('');
        setImage(null);
        setEditing(false);
        setEditingId(null);
      } else {
        const errorData = await response.json();
        console.error('Error saving news article:', errorData);
        alert(`Error saving news article: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving news article:', error);
      alert('Failed to save news article. Please check the console for details.');
    }
  };

  const handleEdit = (article) => {
    setEditing(true);
    setEditingId(article._id);
    setTitle(article.title);
    setContent(article.content);
    setImage(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/news/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        fetchNews();
      } else {
        console.error('Error deleting news article');
      }
    } catch (error) {
      console.error('Error deleting news article:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Panel</h1>
        <Card className="p-8 mb-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">{editing ? 'Edit' : 'Create'} News Article</h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                }}
                className="bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </form>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">News Articles</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Title,</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsArticles.map((article) => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(article._id)} className="ml-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;