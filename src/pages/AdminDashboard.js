import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setContent, setCategories } from '../redux/adminSlice-tech';
import { getUsers, getContent, getCategories, deactivateUser, approveContent, flagContent, createCategory, postContent, editContent } from '../services/api-tech'; 
import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';

const TechWriterDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const content = useSelector((state) => state.admin.content);
  const categories = useSelector((state) => state.admin.categories);
  const navigate = useNavigate(); 

  const [activeSection, setActiveSection] = useState('users'); // Default to 'users'
  const [newCategory, setNewCategory] = useState('');
  const [newContent, setNewContent] = useState('');
  const [contentToEdit, setContentToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const contentData = await getContent();
        const categoriesData = await getCategories();

        dispatch(setUsers(usersData?.data || []));
        dispatch(setContent(contentData?.data || []));
        dispatch(setCategories(categoriesData?.data || []));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePostContent = async () => {
    try {
      await postContent({ content: newContent });
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
      setNewContent('');
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  const handleEditContent = async () => {
    try {
      await editContent(contentToEdit.id, { content: newContent });
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
      setContentToEdit(null);
      setNewContent('');
    } catch (error) {
      console.error('Error editing content:', error);
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await deactivateUser(userId);
      const updatedUsers = await getUsers();
      dispatch(setUsers(updatedUsers?.data || []));
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      await approveContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      await flagContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
    } catch (error) {
      console.error('Error flagging content:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await createCategory({ name: newCategory });
      const updatedCategories = await getCategories();
      dispatch(setCategories(updatedCategories?.data || []));
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
    navigate(`/tech-writer/${section}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelectSection={setActiveSection} />
      <div style={{ marginLeft: 240, padding: '20px', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Tech Writer Dashboard
        </Typography>

        <Button 
          onClick={() => navigateToSection('users')}
          variant="contained" 
          color="primary"
          style={{ marginBottom: '20px' }}
        >
          Manage Users
        </Button>

        <Button 
          onClick={() => navigateToSection('content')}
          variant="contained" 
          color="secondary"
          style={{ marginBottom: '20px' }}
        >
          Manage Content
        </Button>

        <Button 
          onClick={() => navigateToSection('categories')}
          variant="contained" 
          color="success"
          style={{ marginBottom: '20px' }}
        >
          Manage Categories
        </Button>

        {/* Manage Content Section */}
        {activeSection === 'content' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Content</Typography>
                  {content && content.length > 0 ? (
                    content.map((item) => (
                      <div key={item.id} style={{ marginBottom: '10px' }}>
                        <Typography>{item.title}</Typography>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleApproveContent(item.id)} 
                          style={{ marginTop: '5px', marginRight: '5px' }}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error" 
                          onClick={() => handleFlagContent(item.id)} 
                          style={{ marginTop: '5px' }}
                        >
                          Flag
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Typography>No content available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Content Creation Section */}
        {activeSection === 'createContent' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Create Content</Typography>
                  <TextField 
                    label="Content" 
                    variant="outlined" 
                    value={newContent} 
                    onChange={(e) => setNewContent(e.target.value)} 
                    fullWidth 
                    multiline
                    rows={4}
                    style={{ marginTop: '15px' }} 
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handlePostContent} 
                    style={{ marginTop: '10px' }}
                  >
                    Post Content
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Category Management Section */}
        {activeSection === 'categories' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Categories</Typography>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <Typography key={category.id} style={{ marginBottom: '10px' }}>
                        {category.name}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No categories available</Typography>
                  )}
                  <TextField 
                    label="New Category" 
                    variant="outlined" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    fullWidth 
                    style={{ marginTop: '15px' }} 
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreateCategory} 
                    style={{ marginTop: '10px' }}
                  >
                    Create Category
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default TechWriterDashboard;
