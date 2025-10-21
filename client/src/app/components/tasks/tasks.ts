import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent {
  private readonly storageKey = 'taskManager.tasks.v1';

  newTaskTitle: string = '';
  searchQuery: string = '';
  statusFilter: 'all' | 'active' | 'completed' = 'all';

  tasks: Task[] = this.loadTasks();

  addTask(): void {
    const title = (this.newTaskTitle || '').trim();
    if (!title) return;
    const task: Task = {
      id: this.generateId(),
      title,
      completed: false,
      isEditing: false,
      editTitle: title,
      createdAt: Date.now(),
    };
    this.tasks = [task, ...this.tasks];
    this.newTaskTitle = '';
    this.saveTasks();
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  startEditing(task: Task): void {
    task.isEditing = true;
    task.editTitle = task.title;
  }

  finishEditing(task: Task): void {
    if (!task.isEditing) return;
    const title = (task.editTitle || '').trim();
    if (!title) {
      this.deleteTask(task);
    } else {
      task.title = title;
    }
    task.isEditing = false;
    this.saveTasks();
  }

  handleEditKeydown(event: KeyboardEvent, task: Task): void {
    if (event.key === 'Enter') {
      this.finishEditing(task);
    } else if (event.key === 'Escape') {
      task.isEditing = false;
      task.editTitle = task.title;
    }
  }

  toggleCompleted(task: Task, completed: boolean): void {
    task.completed = completed;
    this.saveTasks();
  }

  toggleAll(completed: boolean): void {
    this.tasks = this.tasks.map(t => ({ ...t, completed }));
    this.saveTasks();
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.saveTasks();
  }

  hasCompleted(): boolean {
    return this.tasks.some(t => t.completed);
  }

  remainingCount(): number {
    return this.tasks.reduce((acc, t) => acc + (t.completed ? 0 : 1), 0);
  }

  setStatusFilter(filter: 'all' | 'active' | 'completed'): void {
    this.statusFilter = filter;
  }

  filteredTasks(): Task[] {
    const query = (this.searchQuery || '').trim().toLowerCase();
    const byStatus = (t: Task) =>
      this.statusFilter === 'active' ? !t.completed :
      this.statusFilter === 'completed' ? t.completed : true;
    const byQuery = (t: Task) => (query ? t.title.toLowerCase().includes(query) : true);
    return this.tasks.filter(t => byStatus(t) && byQuery(t));
  }

  private loadTasks(): Task[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    
    const list: StoredTask[] = JSON.parse(raw);
    return list.map(t => ({
      id: t.id ?? this.generateId(),
      title: t.title ?? '',
      completed: !!t.completed,
      isEditing: false,
      editTitle: t.title ?? '',
      createdAt: t.createdAt ?? Date.now(),
    }));
  }

  private saveTasks(): void {
    const toStore: StoredTask[] = this.tasks.map(t => ({
      id: t.id,
      title: t.title,
      completed: t.completed,
      createdAt: t.createdAt,
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(toStore));
  }

  private generateId(): string {
    return 't_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

interface Task {
  id: string;
  title: string;
  editTitle: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: number;
}

interface StoredTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}
