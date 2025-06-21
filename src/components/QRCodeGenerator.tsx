
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Link, 
  FileText, 
  User, 
  Image, 
  File,
  CreditCard,
  Download,
  Eye,
  Palette
} from 'lucide-react';

const QRCodeGenerator = () => {
  const [selectedType, setSelectedType] = useState('url');
  const [qrData, setQRData] = useState('');
  const [qrColor, setQRColor] = useState('#2563eb');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const qrTypes = [
    { id: 'url', label: 'URL/Website', icon: Link, description: 'Link to website or URL' },
    { id: 'text', label: 'Plain Text', icon: FileText, description: 'Simple text message' },
    { id: 'vcard', label: 'vCard/Contact', icon: User, description: 'Contact information' },
    { id: '  ', label: 'Image', icon: Image, description: 'Upload and share image' },
    { id: 'file', label: 'File', icon: File, description: 'Share any file' },
    { id: 'payment', label: 'Payment', icon: CreditCard, description: 'Payment QR for bKash/Nagad' }
  ];

  const renderQRPreview = () => (
    <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
      <div className="text-center">
        <div 
          className="w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center shadow-lg"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-sm"
                style={{ 
                  backgroundColor: Math.random() > 0.5 ? qrColor : 'transparent' 
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-blue-600 font-medium">QR Code Preview</p>
      </div>
    </div>
  );

  const renderTypeSpecificForm = () => {
    switch (selectedType) {
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-blue-800">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text" className="text-blue-800">Text Message</Label>
              <textarea
                id="text"
                className="w-full p-3 border border-blue-200 rounded-lg resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                rows={4}
                placeholder="Enter your text message here..."
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-blue-800">First Name</Label>
                <Input id="firstName" placeholder="John" className="border-blue-200 focus:border-blue-400" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-blue-800">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="border-blue-200 focus:border-blue-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-blue-800">Phone Number</Label>
              <Input id="phone" placeholder="+880 1234567890" className="border-blue-200 focus:border-blue-400" />
            </div>
            <div>
              <Label htmlFor="email" className="text-blue-800">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="border-blue-200 focus:border-blue-400" />
            </div>
            <div>
              <Label htmlFor="company" className="text-blue-800">Company</Label>
              <Input id="company" placeholder="Company Name" className="border-blue-200 focus:border-blue-400" />
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="paymentMethod" className="text-blue-800">Payment Method</Label>
              <select className="w-full p-3 border border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200">
                <option value="bkash">bKash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
                <option value="upay">Upay</option>
              </select>
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-blue-800">Phone Number</Label>
              <Input id="phoneNumber" placeholder="01712345678" className="border-blue-200 focus:border-blue-400" />
            </div>
            <div>
              <Label htmlFor="amount" className="text-blue-800">Amount (Optional)</Label>
              <Input id="amount" type="number" placeholder="0" className="border-blue-200 focus:border-blue-400" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-blue-600">Select a QR type to continue</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create QR Code</h1>
        <p className="text-blue-600">Generate custom QR codes for various purposes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* QR Type Selection */}
        <Card className="lg:col-span-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-blue-800">1. Choose QR Code Type</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {qrTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    selectedType === type.id
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md'
                      : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <type.icon className={`h-6 w-6 mb-2 ${
                    selectedType === type.id ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <h3 className={`font-medium mb-1 ${
                    selectedType === type.id ? 'text-blue-800' : 'text-blue-700'
                  }`}>{type.label}</h3>
                  <p className="text-xs text-blue-600">{type.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* QR Preview */}
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-purple-800">Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderQRPreview()}
            <div className="mt-4 space-y-2">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="lg:col-span-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-blue-800">2. Enter Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderTypeSpecificForm()}
          </CardContent>
        </Card>

        {/* Customization */}
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-purple-800">3. Customize Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div>
              <Label htmlFor="qrColor" className="text-blue-800">QR Code Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="qrColor"
                  value={qrColor}
                  onChange={(e) => setQRColor(e.target.value)}
                  className="w-12 h-8 rounded border border-blue-200"
                />
                <Input
                  value={qrColor}
                  onChange={(e) => setQRColor(e.target.value)}
                  className="flex-1 border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bgColor" className="text-blue-800">Background Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="bgColor"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-8 rounded border border-blue-200"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="pt-4">
              <Label className="text-blue-800">Quick Color Presets</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { qr: '#2563eb', bg: '#ffffff' },
                  { qr: '#7c3aed', bg: '#ffffff' },
                  { qr: '#ffffff', bg: '#2563eb' },
                  { qr: '#ffffff', bg: '#7c3aed' }
                ].map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQRColor(preset.qr);
                      setBackgroundColor(preset.bg);
                    }}
                    className="w-full h-8 rounded border border-blue-200 flex hover:shadow-md transition-shadow"
                  >
                    <div 
                      className="flex-1 rounded-l"
                      style={{ backgroundColor: preset.qr }}
                    />
                    <div 
                      className="flex-1 rounded-r"
                      style={{ backgroundColor: preset.bg }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
          <QrCode className="h-5 w-5 mr-2" />
          Generate QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
