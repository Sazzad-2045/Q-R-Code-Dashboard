
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
  const [qrColor, setQRColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const qrTypes = [
    { id: 'url', label: 'URL/Website', icon: Link, description: 'Link to website or URL' },
    { id: 'text', label: 'Plain Text', icon: FileText, description: 'Simple text message' },
    { id: 'vcard', label: 'vCard/Contact', icon: User, description: 'Contact information' },
    { id: 'image', label: 'Image', icon: Image, description: 'Upload and share image' },
    { id: 'file', label: 'File', icon: File, description: 'Share any file' },
    { id: 'payment', label: 'Payment', icon: CreditCard, description: 'Payment QR for bKash/Nagad' }
  ];

  const renderQRPreview = () => (
    <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed">
      <div className="text-center">
        <div 
          className="w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center"
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
        <p className="text-sm text-muted-foreground">QR Code Preview</p>
      </div>
    </div>
  );

  const renderTypeSpecificForm = () => {
    switch (selectedType) {
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Message</Label>
              <textarea
                id="text"
                className="w-full p-3 border rounded-lg resize-none"
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
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+880 1234567890" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Company Name" />
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select className="w-full p-3 border rounded-lg">
                <option value="bkash">bKash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
                <option value="upay">Upay</option>
              </select>
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="01712345678" />
            </div>
            <div>
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input id="amount" type="number" placeholder="0" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Select a QR type to continue</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Create QR Code</h1>
        <p className="text-muted-foreground">Generate custom QR codes for various purposes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* QR Type Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>1. Choose QR Code Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {qrTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <type.icon className={`h-6 w-6 mb-2 ${
                    selectedType === type.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h3 className="font-medium mb-1">{type.label}</h3>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* QR Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {renderQRPreview()}
            <div className="mt-4 space-y-2">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>2. Enter Information</CardTitle>
          </CardHeader>
          <CardContent>
            {renderTypeSpecificForm()}
          </CardContent>
        </Card>

        {/* Customization */}
        <Card>
          <CardHeader>
            <CardTitle>3. Customize Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="qrColor">QR Code Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="qrColor"
                  value={qrColor}
                  onChange={(e) => setQRColor(e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={qrColor}
                  onChange={(e) => setQRColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bgColor">Background Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="bgColor"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="pt-4">
              <Label>Quick Color Presets</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { qr: '#000000', bg: '#ffffff' },
                  { qr: '#006747', bg: '#ffffff' },
                  { qr: '#ffffff', bg: '#000000' },
                  { qr: '#DC143C', bg: '#ffffff' }
                ].map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQRColor(preset.qr);
                      setBackgroundColor(preset.bg);
                    }}
                    className="w-full h-8 rounded border flex"
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
        <Button size="lg" className="px-8">
          <QrCode className="h-5 w-5 mr-2" />
          Generate QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
