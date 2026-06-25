import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface AuditItem {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  penalty: number;
  passed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  complianceItems: AuditItem[] = [
    { id: 1, title: '🔒 Enforce Strict CORS Domain Scopes', description: 'Ensure access parameters restrict malicious origin requests.', severity: 'High', penalty: 35, passed: false },
    { id: 2, title: '🔑 Encrypt Environment API Variable Hooks', description: 'Prevent private credential constants leaking into public bundles.', severity: 'High', penalty: 45, passed: false },
    { id: 3, title: '🌐 Enforce HTTPS HSTS Traffic Redirection', description: 'Configure strict server routing headers to downgrade injection attacks.', severity: 'Medium', penalty: 20, passed: true },
    { id: 4, title: '📦 Sanitize InnerHTML Content Form Bindings', description: 'Scrub template strings to intercept Cross-Site Scripting (XSS) actions.', severity: 'Low', penalty: 10, passed: false }
  ];

  
  get riskScore(): number {
    const unpassedItems = this.complianceItems.filter(item => !item.passed);
    const totalPenalty = unpassedItems.reduce((acc, current) => acc + current.penalty, 0);
    
    return Math.min(100, Math.max(0, totalPenalty));
  }

 
  toggleAuditItem(id: number): void {
    this.complianceItems = this.complianceItems.map(item => 
      item.id === id ? { ...item, passed: !item.passed } : item
    );
  }

  
  resetAllChecks(): void {
    this.complianceItems = this.complianceItems.map(item => ({ ...item, passed: false }));
  }
}