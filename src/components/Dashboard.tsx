
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Settings, 
  User, 
  Plus, 
  Search,
  BarChart3,
  QrCode,
  Eye,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';

interface QRCode {
  id: string;
  name: string;
  type: string;
  scans: number;
  status: 'active' | 'paused';
  created: string;
  isDynamic: boolean;
}

const Dashboard = () => {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockQRCodes: QRCode[] = [
    { id: '1', name: 'Restaurant Menu', type: 'URL', scans: 2450, status: 'active', created: '2024-01-15', isDynamic: true },
    { id: '2', name: 'Business Card', type: 'vCard', scans: 890, status: 'active', created: '2024-01-10', isDynamic: false },
    { id: '3', name: 'Event Ticket', type: 'Text', scans: 1200, status: 'paused', created: '2024-01-08', isDynamic: true },
    { id: '4', name: 'Product Info', type: 'URL', scans: 650, status: 'active', created: '2024-01-05', isDynamic: true },
  ];

  const translations = {
    en: {
      dashboard: 'Dashboard',
      myQRCodes: 'My QR Codes',
      analytics: 'Analytics',
      createQR: 'Create QR Code',
      templates: 'Templates',
      settings: 'Settings',
      totalQRCodes: 'Total QR Codes',
      totalScans: 'Total Scans',
      activeQRs: 'Active QRs',
      recentActivity: 'Recent Activity',
      topPerforming: 'Top Performing QR',
      quickCreate: 'Quick Create QR',
      subscriptionStatus: 'Subscription Status',
      viewAll: 'View All',
      name: 'Name',
      type: 'Type',
      scans: 'Scans',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      paused: 'Paused'
    },
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      myQRCodes: 'আমার QR কোড',
      analytics: 'অ্যানালিটিক্স',
      createQR: 'QR কোড তৈরি করুন',
      templates: 'টেমপ্লেট',
      settings: 'সেটিংস',
      totalQRCodes: 'মোট QR কোড',
      totalScans: 'মোট স্ক্যান',
      activeQRs: 'সক্রিয় QR',
      recentActivity: 'সাম্প্রতিক কার্যকলাপ',
      topPerforming: 'সেরা পারফরমিং QR',
      quickCreate: 'দ্রুত QR তৈরি করুন',
      subscriptionStatus: 'সাবস্ক্রিপশন স্ট্যাটাস',
      viewAll: 'সব দেখুন',
      name: 'নাম',
      type: 'ধরন',
      scans: 'স্ক্যান',
      status: 'অবস্থা',
      actions: 'কার্যক্রম',
      active: 'সক্রিয়',
      paused: 'বিরতি'
    }
  };

  const t = translations[language];

  const StatCard = ({ title, value, icon: Icon, color = "text-primary" }: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
  }) => (
    <Card className="hover-scale glass-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.totalQRCodes} 
          value={mockQRCodes.length} 
          icon={QrCode}
          color="text-bangladesh-green"
        />
        <StatCard 
          title={t.totalScans} 
          value="5,190" 
          icon={Eye}
          color="text-blue-600"
        />
        <StatCard 
          title={t.activeQRs} 
          value={mockQRCodes.filter(qr => qr.status === 'active').length} 
          icon={BarChart3}
          color="text-green-600"
        />
        <StatCard 
          title="Growth Rate" 
          value="+12%" 
          icon={BarChart3}
          color="text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockQRCodes.slice(0, 3).map((qr) => (
                <div key={qr.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <QrCode className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{qr.name}</p>
                      <p className="text-sm text-muted-foreground">{qr.type} • {qr.scans} scans</p>
                    </div>
                  </div>
                  <Badge variant={qr.status === 'active' ? 'default' : 'secondary'}>
                    {qr.status === 'active' ? t.active : t.paused}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{t.quickCreate}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => setActiveTab('createQR')}>
                <Plus className="h-4 w-4 mr-2" />
                {t.createQR}
              </Button>
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Browse Templates
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{t.subscriptionStatus}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Plan</span>
                  <Badge>Pro Plan</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">QR Codes</span>
                  <span className="text-sm font-medium">4/100</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '4%' }}></div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderMyQRCodes = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">{t.myQRCodes}</h2>
        <Button onClick={() => setActiveTab('createQR')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New QR
        </Button>
      </div>
      
      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium">{t.name}</th>
                  <th className="text-left p-4 font-medium">{t.type}</th>
                  <th className="text-left p-4 font-medium">{t.scans}</th>
                  <th className="text-left p-4 font-medium">{t.status}</th>
                  <th className="text-left p-4 font-medium">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {mockQRCodes.map((qr) => (
                  <tr key={qr.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <QrCode className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{qr.name}</p>
                          <p className="text-sm text-muted-foreground">Created {qr.created}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{qr.type}</Badge>
                    </td>
                    <td className="p-4 font-medium">{qr.scans.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={qr.status === 'active' ? 'default' : 'secondary'}>
                        {qr.status === 'active' ? t.active : t.paused}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-bangladesh-green to-bangladesh-lightGreen rounded-lg flex items-center justify-center">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-bangladesh-green">QR Khata</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="font-medium"
            >
              {language === 'en' ? 'বাং' : 'EN'}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-sm border-r min-h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
              { id: 'myQRCodes', label: t.myQRCodes, icon: QrCode },
              { id: 'analytics', label: t.analytics, icon: BarChart3 },
              { id: 'createQR', label: t.createQR, icon: Plus },
              { id: 'templates', label: t.templates, icon: Settings },
              { id: 'settings', label: t.settings, icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboardContent()}
          {activeTab === 'myQRCodes' && renderMyQRCodes()}
          {activeTab === 'createQR' && <QRCodeGenerator />}
          {(activeTab === 'analytics' || activeTab === 'templates' || activeTab === 'settings') && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
