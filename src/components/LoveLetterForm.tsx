
"use client";

import { useState } from "react";
import { generateLoveLetter } from "@/ai/flows/ai-generated-love-letter-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Send, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LoveLetterForm() {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [occasion, setOccasion] = useState("");
  const [keyFeelings, setKeyFeelings] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !sender) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide at least the recipient and sender names.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLoveLetter({
        recipientName: recipient,
        senderName: sender,
        occasion: occasion,
        keyFeelings: keyFeelings,
      });
      setGeneratedLetter(result.loveLetter);
      toast({
        title: "Letter Crafted",
        description: "Your AI-generated love letter is ready!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong while generating the letter.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copied!",
      description: "Letter copied to clipboard.",
    });
  };

  return (
    <section id="ai-tool" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline mb-4 text-primary">AI Love Letter Assistant</h2>
          <p className="text-muted-foreground">Let AI help you express what's in your heart.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
                Craft Your Message
              </CardTitle>
              <CardDescription>Tell us a bit about your love.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">To</Label>
                    <Input
                      id="recipient"
                      placeholder="e.g., My Dearest Sarah"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender">From</Label>
                    <Input
                      id="sender"
                      placeholder="e.g., Your Loving Mark"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion</Label>
                  <Input
                    id="occasion"
                    placeholder="e.g., 5th Anniversary, Valentine's Day"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyFeelings">Specific Memories or Feelings</Label>
                  <Textarea
                    id="keyFeelings"
                    placeholder="e.g., the way you smile, our first date at the park..."
                    value={keyFeelings}
                    onChange={(e) => setKeyFeelings(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Weaving Words...
                    </>
                  ) : (
                    "Draft Love Letter"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/20 bg-white/50 h-full min-h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Letter
                {generatedLetter && (
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedLetter ? (
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap font-body italic leading-relaxed">
                  {generatedLetter}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <Send className="h-12 w-12 mb-4 opacity-20" />
                  <p>Your beautiful letter will appear here once generated.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
