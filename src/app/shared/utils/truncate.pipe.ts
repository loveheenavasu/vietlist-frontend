import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'truncateHtml' , standalone:true })
export class TruncateHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string, limit: number): SafeHtml {
    const withoutTags = html ? html.replace(/<[^>]*>/g, '') : ''; // Remove HTML tags
    const truncated = withoutTags.substring(0, limit); // Truncate the text
    const truncatedHtml = truncated + (withoutTags.length > limit ? '...' : ''); // Add ellipsis if necessary
    return this.sanitizer.bypassSecurityTrustHtml(truncatedHtml); // Sanitize and return
  }
}
