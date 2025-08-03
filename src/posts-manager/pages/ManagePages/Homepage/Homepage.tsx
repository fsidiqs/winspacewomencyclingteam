import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/posts-manager/components/ui/card';
import { Button } from '@/posts-manager/components/ui/button';
import { Input } from '@/posts-manager/components/ui/input';
import { Label } from '@/posts-manager/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/posts-manager/components/ui/tabs';
import { Textarea } from '@/posts-manager/components/ui/textarea';
import { apiRequest, apiRequestWithAuth } from '@/admin/lib/api';
import MediaSelectorPopulate, { MediaItem } from '@/posts-manager/components/posts/MediaSelectorPopulate';
import { getImageUrl } from '@/lib/cleanUrl';

interface Quote {
  content: { en: string; fr: string };
  person: string;
  personTitle: { en: string; fr: string };
}

interface HomepageFormData {
  HeroImageBanner: MediaItem | null;
  HeroVideoThumbnail: MediaItem | null;
  HeroVideoUrl: string;
  HeroVideoTitle: { en: string; fr: string };
  Section1Title: { en: string; fr: string };
  Section1Subtitle: { en: string; fr: string };
  Section1Paragraph: { en: string; fr: string };
  Section1Image1: MediaItem | null;
  Section1Image2: MediaItem | null;
  SectionQuotesImage: MediaItem | null;
  SectionQuotesText: Quote[];
}

const defaultLang = { en: '', fr: '' };

// Helper to convert image path to MediaItem (minimal)
function pathToMediaItem(path?: string | null): MediaItem | null {
  if (!path) return null;
  return { id: 0, file_path: path } as MediaItem;
}

const ManageHomepage: React.FC = () => {
  const [formData, setFormData] = useState<HomepageFormData>({
    HeroImageBanner: null,
    HeroVideoThumbnail: null,
    HeroVideoUrl: '',
    HeroVideoTitle: { ...defaultLang },
    Section1Title: { ...defaultLang },
    Section1Subtitle: { ...defaultLang },
    Section1Paragraph: { ...defaultLang },
    Section1Image1: null,
    Section1Image2: null,
    SectionQuotesImage: null,
    SectionQuotesText: [
      { content: { ...defaultLang }, person: '', personTitle: { ...defaultLang } },
    ],
  });
  const [activeTab, setActiveTab] = useState<'en' | 'fr'>('en');
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<React.FormEvent | null>(null);

  // Fetch homepage data on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const hero = await apiRequest('/api/homepage/hero-banner', 'GET');
        const section1 = await apiRequest('/api/homepage/section1', 'GET');
        const quotes = await apiRequest('/api/homepage/quotes', 'GET');
        setFormData(prev => ({
          ...prev,
          HeroImageBanner: pathToMediaItem(hero.image_path),
          HeroVideoThumbnail: pathToMediaItem(hero.image_path),
          HeroVideoUrl: hero.video_path || '',
          HeroVideoTitle: { en: hero.video_title_en || '', fr: hero.video_title_fr || '' },
          Section1Title: { en: section1.title_en || '', fr: section1.title_fr || '' },
          Section1Subtitle: { en: section1.subtitle_en || '', fr: section1.subtitle_fr || '' },
          Section1Paragraph: { en: section1.paragraph_en || '', fr: section1.paragraph_fr || '' },
          Section1Image1: pathToMediaItem(section1.image1_path),
          Section1Image2: pathToMediaItem(section1.image2_path),
          SectionQuotesImage: pathToMediaItem(quotes.section_image),
          SectionQuotesText: Array.isArray(quotes.items) && quotes.items.length > 0
            ? quotes.items.map((q: any) => ({
              content: { en: q.content_en || '', fr: q.content_fr || '' },
              person: q.person || '',
              personTitle: { en: q.person_title_en || '', fr: q.person_title_fr || '' },
            }))
            : [],
        }));
      } catch (e) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLangChange = (field: keyof HomepageFormData, lang: 'en' | 'fr', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field] as any, [lang]: value },
    }));
  };

  const handleQuoteChange = (idx: number, key: keyof Quote, value: any, lang?: 'en' | 'fr') => {
    setFormData(prev => {
      const quotes = [...prev.SectionQuotesText];
      if (lang) {
        quotes[idx][key] = { ...quotes[idx][key] as any, [lang]: value };
      } else {
        quotes[idx][key] = value;
      }
      return { ...prev, SectionQuotesText: quotes };
    });
  };

  const addQuote = () => {
    setFormData(prev => ({
      ...prev,
      SectionQuotesText: [
        ...prev.SectionQuotesText,
        { content: { ...defaultLang }, person: '', personTitle: { ...defaultLang } },
      ],
    }));
  };

  const removeQuote = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      SectionQuotesText: prev.SectionQuotesText.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting form data:', formData);
    try {
      // 1. POST Hero Banner
      await apiRequestWithAuth('/api/homepage/hero-banner', 'POST', {
        image_path: formData.HeroImageBanner?.file_path || '',
        video_thumbnail_path: formData.HeroVideoThumbnail?.file_path || '',
        video_url: formData.HeroVideoUrl,
        video_title_en: formData.HeroVideoTitle.en,
        video_title_fr: formData.HeroVideoTitle.fr,
      });
      // 2. POST Section 1
      await apiRequestWithAuth('/api/homepage/section1', 'POST', {
        title_en: formData.Section1Title.en,
        title_fr: formData.Section1Title.fr,
        subtitle_en: formData.Section1Subtitle.en,
        subtitle_fr: formData.Section1Subtitle.fr,
        paragraph_en: formData.Section1Paragraph.en,
        paragraph_fr: formData.Section1Paragraph.fr,
        image1_path: formData.Section1Image1?.file_path || '',
        image2_path: formData.Section1Image2?.file_path || '',
      });
      // 3. POST Quotes
      await apiRequestWithAuth('/api/homepage/quotes', 'POST', {
        section_image: formData.SectionQuotesImage?.file_path || '',
        quotes: formData.SectionQuotesText.map(q => ({
          content_en: q.content.en,
          content_fr: q.content.fr,
          person: q.person,
          person_title_en: q.personTitle.en,
          person_title_fr: q.personTitle.fr,
        })),
      });
      alert('Homepage content saved!');
    } catch (err: any) {
      alert('Failed to save homepage: ' + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setPendingEvent(e);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (pendingEvent) {
      await handleSubmit(pendingEvent);
      setPendingEvent(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingEvent(null);
  };

  return (
    <Card className={`mx-auto my-8 relative${loading ? ' min-h-[400px]' : ''}`}>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 min-h-[400px]">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">Homepage Content</CardTitle>
      </CardHeader>
      <CardContent>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
              <div className="mb-4 text-lg font-semibold">Confirm Save</div>
              <div className="mb-6">Are you sure you want to save the homepage content?</div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button type="button" variant="default" onClick={handleConfirm}>Yes, Save</Button>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSaveClick} className="space-y-8">
          {/* Hero Image Banner */}
          <div className="space-y-2">
            <Label>Hero Image Banner</Label>
            <MediaSelectorPopulate isRequired={false} selectedMedia={formData.HeroImageBanner} onSelect={media => setFormData(f => ({ ...f, HeroImageBanner: media }))} />
          </div>
          {/* Hero Video Thumbnail */}
          <div className="space-y-2">
            <Label>Hero Video Thumbnail</Label>
            <MediaSelectorPopulate isRequired={false} selectedMedia={formData.HeroVideoThumbnail} onSelect={media => setFormData(f => ({ ...f, HeroVideoThumbnail: media }))} />
          </div>
          {/* Hero Video URL */}
          <div className="space-y-2">
            <Label htmlFor="hero-video-url">Hero Video URL</Label>
            <Input id="hero-video-url" value={formData.HeroVideoUrl} onChange={e => setFormData(f => ({ ...f, HeroVideoUrl: e.target.value }))} placeholder="https://..." />
          </div>
          {/* Hero Video Title (EN/FR) */}
          <div className="space-y-2">
            <Label>Hero Video Title</Label>
            <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
              </TabsList>
              <TabsContent value="en">
                <Input value={formData.HeroVideoTitle.en} onChange={e => handleLangChange('HeroVideoTitle', 'en', e.target.value)} placeholder="Enter English title" />
              </TabsContent>
              <TabsContent value="fr">
                <Input value={formData.HeroVideoTitle.fr} onChange={e => handleLangChange('HeroVideoTitle', 'fr', e.target.value)} placeholder="Entrez le titre français" />
              </TabsContent>
            </Tabs>
          </div>
          {/* Section 1 Title */}
          <div className="space-y-2">
            <Label>Section 1 Title</Label>
            <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
              </TabsList>
              <TabsContent value="en">
                <Input value={formData.Section1Title.en} onChange={e => handleLangChange('Section1Title', 'en', e.target.value)} placeholder="Enter English title" />
              </TabsContent>
              <TabsContent value="fr">
                <Input value={formData.Section1Title.fr} onChange={e => handleLangChange('Section1Title', 'fr', e.target.value)} placeholder="Entrez le titre français" />
              </TabsContent>
            </Tabs>
          </div>
          {/* Section 1 Subtitle */}
          <div className="space-y-2">
            <Label>Section 1 Subtitle</Label>
            <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
              </TabsList>
              <TabsContent value="en">
                <Input value={formData.Section1Subtitle.en} onChange={e => handleLangChange('Section1Subtitle', 'en', e.target.value)} placeholder="Enter English subtitle" />
              </TabsContent>
              <TabsContent value="fr">
                <Input value={formData.Section1Subtitle.fr} onChange={e => handleLangChange('Section1Subtitle', 'fr', e.target.value)} placeholder="Entrez le sous-titre français" />
              </TabsContent>
            </Tabs>
          </div>
          {/* Section 1 Paragraph */}
          <div className="space-y-2">
            <Label>Section 1 Paragraph</Label>
            <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
              </TabsList>
              <TabsContent value="en">
                <Textarea value={formData.Section1Paragraph.en} onChange={e => handleLangChange('Section1Paragraph', 'en', e.target.value)} placeholder="Enter English paragraph" />
              </TabsContent>
              <TabsContent value="fr">
                <Textarea value={formData.Section1Paragraph.fr} onChange={e => handleLangChange('Section1Paragraph', 'fr', e.target.value)} placeholder="Entrez le paragraphe français" />
              </TabsContent>
            </Tabs>
          </div>
          {/* Section 1 Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Section 1 Image 1</Label>
              <MediaSelectorPopulate isRequired={false} selectedMedia={formData.Section1Image1} onSelect={media => setFormData(f => ({ ...f, Section1Image1: media }))} />
            </div>
            <div className="space-y-2">
              <Label>Section 1 Image 2</Label>
              <MediaSelectorPopulate isRequired={false} selectedMedia={formData.Section1Image2} onSelect={media => setFormData(f => ({ ...f, Section1Image2: media }))} />
              {formData.Section1Image2 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Current Image Preview:</span>
                  <div className="mt-1">
                    <img src={getImageUrl(formData.Section1Image2.file_path)} alt="Section 1 Image 2 Preview" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 8 }} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Section Quotes Image */}
          <div className="space-y-2">
            <Label>Section Quotes Image</Label>
            <MediaSelectorPopulate isRequired={false} selectedMedia={formData.SectionQuotesImage} onSelect={media => setFormData(f => ({ ...f, SectionQuotesImage: media }))} />
          </div>
          {/* Section Quotes Text (Array) */}
          <div className="space-y-2">
            <Label>Section Quotes</Label>
            {formData.SectionQuotesText.map((quote, idx) => (
              <div key={idx} className="border rounded-lg p-4 mb-2 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Quote #{idx + 1}</span>
                  {formData.SectionQuotesText.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeQuote(idx)}>
                      Remove
                    </Button>
                  )}
                </div>
                <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
                  <TabsList>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="fr">French</TabsTrigger>
                  </TabsList>
                  <TabsContent value="en">
                    <Textarea value={quote.content.en} onChange={e => handleQuoteChange(idx, 'content', e.target.value, 'en')} placeholder="Enter English quote" />
                  </TabsContent>
                  <TabsContent value="fr">
                    <Textarea value={quote.content.fr} onChange={e => handleQuoteChange(idx, 'content', e.target.value, 'fr')} placeholder="Entrez la citation française" />
                  </TabsContent>
                </Tabs>
                <div className="mt-2">
                  <Label>Person</Label>
                  <Input value={quote.person} onChange={e => handleQuoteChange(idx, 'person', e.target.value)} placeholder="Person who quotes" />
                </div>
                <div className="mt-2">
                  <Label>Person Title</Label>
                  <Tabs defaultValue="en" value={activeTab} onValueChange={v => setActiveTab(v as 'en' | 'fr')}>
                    <TabsList>
                      <TabsTrigger value="en">English</TabsTrigger>
                      <TabsTrigger value="fr">French</TabsTrigger>
                    </TabsList>
                    <TabsContent value="en">
                      <Input value={quote.personTitle.en} onChange={e => handleQuoteChange(idx, 'personTitle', e.target.value, 'en')} placeholder="Enter English title" />
                    </TabsContent>
                    <TabsContent value="fr">
                      <Input value={quote.personTitle.fr} onChange={e => handleQuoteChange(idx, 'personTitle', e.target.value, 'fr')} placeholder="Entrez le titre français" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addQuote}>
              Add Quote
            </Button>
          </div>
          {/* Submit */}
          <div className="pt-6 border-t flex gap-4">
            <Button type="submit" className="px-8" disabled={loading}>
              {loading ? 'Saving...' : 'Save Homepage'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageHomepage;
