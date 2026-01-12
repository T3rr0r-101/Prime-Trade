import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/authService';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatsCard from '../components/dashboard/StatsCard';
import TaskCard from '../components/dashboard/TaskCard';
import SearchBar from '../components/dashboard/SearchBar';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProgressRing from '../components/ui/ProgressRing';
import EmptyState from '../components/ui/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completingTasks, setCompletingTasks] = useState(new Set());
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });

  useEffect(() => {
    loadTasks();
  }, [search, filter]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const loadTasks = async () => {
    try {
      const params = { search, ...filter };
      Object.keys(params).forEach(key => !params[key] && delete params[key]);
      const data = await taskService.getTasks(params);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
      } else {
        await taskService.createTask(formData);
      }
      setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData(task);
    setShowForm(true);
  };

  const handleCompleteTask = async (task) => {
    if (task.status === 'completed') return;
    
    setCompletingTasks(prev => new Set([...prev, task._id]));
    
    // Animate completion
    setTimeout(async () => {
      try {
        await taskService.updateTask(task._id, { ...task, status: 'completed' });
        loadTasks();
      } catch (error) {
        console.error('Error completing task:', error);
      } finally {
        setCompletingTasks(prev => {
          const newSet = new Set(prev);
          newSet.delete(task._id);
          return newSet;
        });
      }
    }, 1000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const pendingRate = stats.total > 0 ? ((stats.total - stats.pending) / stats.total) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-x-hidden">
        <section className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header Section */}
          <Header completionRate={completionRate} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Tasks"
              count={stats.total}
              color="blue"
              helperText="from last week"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
            
            <StatsCard
              title="Pending"
              count={stats.pending}
              color="yellow"
              progress={100 - pendingRate}
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            
            <StatsCard
              title="In Progress"
              count={stats.inProgress}
              color="indigo"
              helperText="Active now"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            
            <StatsCard
              title="Completed"
              count={stats.completed}
              color="green"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <ProgressRing 
                progress={completionRate} 
                size={48} 
                className="text-green-500"
              />
            </StatsCard>
          </div>

          {/* Search and Filters */}
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={handleSearch}
            filter={filter}
            setFilter={setFilter}
            onAddTask={() => setShowForm(true)}
          />

          {/* Tasks Grid */}
          {tasks.length === 0 ? (
            <EmptyState
              title="All caught up!"
              message="Time to relax or create something new."
              actionText="Create Task"
              onAction={() => setShowForm(true)}
              icon="celebration"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onComplete={handleCompleteTask}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isCompleting={completingTasks.has(task._id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Task Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTask(null);
          setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        className="bg-white dark:bg-gray-800"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              placeholder="Enter task description"
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingTask(null);
                setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;