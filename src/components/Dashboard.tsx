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

  const StatCard = ({ title, value, icon: Icon, color = "text-blue-600" }: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
  }) => (
    <Card className="hover-scale glass-card border-blue-100 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
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
          color="text-blue-600"
        />
        <StatCard 
          title={t.totalScans} 
          value="5,190" 
          icon={Eye}
          color="text-purple-600"
        />
        <StatCard 
          title={t.activeQRs} 
          value={mockQRCodes.filter(qr => qr.status === 'active').length} 
          icon={BarChart3}
          color="text-blue-500"
        />
        <StatCard 
          title="Growth Rate" 
          value="+12%" 
          icon={BarChart3}
          color="text-purple-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass-card border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {mockQRCodes.slice(0, 3).map((qr) => (
                <div key={qr.id} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <QrCode className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">{qr.name}</p>
                      <p className="text-sm text-blue-600">{qr.type} • {qr.scans} scans</p>
                    </div>
                  </div>
                  <Badge variant={qr.status === 'active' ? 'default' : 'secondary'} className={qr.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                    {qr.status === 'active' ? t.active : t.paused}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="glass-card border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
              <CardTitle className="text-purple-800">{t.quickCreate}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => setActiveTab('createQR')}>
                <Plus className="h-4 w-4 mr-2" />
                {t.createQR}
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                <Search className="h-4 w-4 mr-2" />
                Browse Templates
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
              <CardTitle className="text-blue-800">{t.subscriptionStatus}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Plan</span>
                  <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">Pro Plan</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">QR Codes</span>
                  <span className="text-sm font-medium text-blue-900">4/100</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
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
        <h2 className="text-2xl font-bold text-blue-900">{t.myQRCodes}</h2>
        <Button onClick={() => setActiveTab('createQR')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New QR
        </Button>
      </div>
      
      <Card className="glass-card border-blue-100 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="text-left p-4 font-medium text-blue-800">{t.name}</th>
                  <th className="text-left p-4 font-medium text-blue-800">{t.type}</th>
                  <th className="text-left p-4 font-medium text-blue-800">{t.scans}</th>
                  <th className="text-left p-4 font-medium text-blue-800">{t.status}</th>
                  <th className="text-left p-4 font-medium text-blue-800">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {mockQRCodes.map((qr) => (
                  <tr key={qr.id} className="border-b border-blue-50 hover:bg-blue-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                          <QrCode className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">{qr.name}</p>
                          <p className="text-sm text-blue-600">Created {qr.created}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-blue-200 text-blue-700">{qr.type}</Badge>
                    </td>
                    <td className="p-4 font-medium text-blue-900">{qr.scans.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={qr.status === 'active' ? 'default' : 'secondary'} className={qr.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {qr.status === 'active' ? t.active : t.paused}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-purple-600 hover:bg-purple-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Top Navigation */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">QR Master</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="font-medium text-blue-600 hover:bg-blue-50"
            >
              {language === 'en' ? 'বাং' : 'EN'}
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/90 backdrop-blur-sm border-r border-blue-100 min-h-screen sticky top-16 shadow-sm">
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
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'hover:bg-blue-50 text-blue-700 hover:text-blue-900'
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">Coming Soon</h2>
              <p className="text-blue-600">This feature is under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
